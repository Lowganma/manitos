-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "citext";

-- Enums
create type user_role as enum ('student','instructor','admin');
create type course_status as enum ('draft','published','archived');
create type payment_status as enum ('pending','paid','failed','refunded');
create type content_type as enum ('video','text','quiz','download');

-- Tables
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  role user_role default 'student',
  bio text,
  created_at timestamp with time zone default now()
);

create table categories (
  id bigserial primary key,
  name citext unique,
  slug text unique,
  created_at timestamp with time zone default now()
);

create table courses (
  id bigserial primary key,
  instructor_id uuid not null references profiles(id),
  title text not null,
  slug text unique,
  subtitle text,
  description text,
  level text,
  language text,
  price_cents int not null default 0,
  currency text default 'USD',
  thumbnail_url text,
  promo_video_url text,
  status course_status default 'draft',
  average_rating numeric(3,2) default 0,
  rating_count int default 0,
  category_id bigint references categories(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table sections (
  id bigserial primary key,
  course_id bigint not null references courses(id) on delete cascade,
  title text not null,
  position int not null,
  created_at timestamp with time zone default now()
);

create table lessons (
  id bigserial primary key,
  course_id bigint not null references courses(id) on delete cascade,
  section_id bigint not null references sections(id) on delete cascade,
  title text not null,
  content_type content_type not null default 'video',
  video_url text,
  text_content text,
  resource_url text,
  duration_seconds int default 0,
  position int not null,
  free_preview boolean default false,
  published boolean default true,
  created_at timestamp with time zone default now()
);

create table enrollments (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id bigint not null references courses(id) on delete cascade,
  status text not null default 'active',
  progress_percent numeric(5,2) default 0,
  last_lesson_id bigint,
  created_at timestamp with time zone default now(),
  unique(user_id, course_id)
);

create table progress (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id bigint not null references courses(id) on delete cascade,
  lesson_id bigint not null references lessons(id) on delete cascade,
  watched_seconds int default 0,
  completed boolean default false,
  updated_at timestamptz default now(),
  unique(user_id, lesson_id)
);

create table reviews (
  id bigserial primary key,
  course_id bigint not null references courses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  title text,
  body text,
  created_at timestamptz default now(),
  unique(user_id, course_id)
);

create table carts (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create table cart_items (
  id bigserial primary key,
  cart_id bigint not null references carts(id) on delete cascade,
  course_id bigint not null references courses(id) on delete cascade,
  price_cents int not null,
  unique(cart_id, course_id)
);

create table orders (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  total_cents int not null,
  currency text default 'USD',
  payment_status payment_status default 'pending',
  external_payment_id text,
  created_at timestamptz default now()
);

create table order_items (
  id bigserial primary key,
  order_id bigint not null references orders(id) on delete cascade,
  course_id bigint not null references courses(id) on delete cascade,
  price_cents int not null
);

create table coupons (
  id bigserial primary key,
  code text unique not null,
  discount_percent int check (discount_percent between 1 and 100),
  active boolean default true,
  max_redemptions int,
  expires_at timestamptz,
  created_at timestamptz default now()
);

create table coupon_redemptions (
  id bigserial primary key,
  code text not null references coupons(code) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id bigint not null references orders(id) on delete cascade,
  created_at timestamptz default now(),
  unique(code, user_id)
);

create table qna_threads (
  id bigserial primary key,
  course_id bigint not null references courses(id) on delete cascade,
  lesson_id bigint references lessons(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  title text,
  body text,
  created_at timestamptz default now()
);

create table qna_posts (
  id bigserial primary key,
  thread_id bigint not null references qna_threads(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
);

-- Indexes
create index idx_courses_status on courses(status);
create index idx_lessons_course_id_position on lessons(course_id, position);
create index idx_enrollments_user_course on enrollments(user_id, course_id);
create index idx_progress_user_course on progress(user_id, course_id);

-- Triggers and functions
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_courses_updated
before update on courses
for each row execute function set_updated_at();

create or replace function on_order_paid_create_enrollments()
returns trigger as $$
begin
  if new.payment_status = 'paid' and old.payment_status <> 'paid' then
    insert into enrollments(user_id, course_id)
    select new.user_id, oi.course_id from order_items oi
    where oi.order_id = new.id
    on conflict (user_id, course_id) do nothing;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_orders_paid
after update on orders
for each row execute function on_order_paid_create_enrollments();

create or replace function on_progress_upsert_update_enrollment()
returns trigger as $$
begin
  update enrollments set progress_percent = (
    select (count(*)::decimal / nullif(total.total,0))*100 from progress p
    join (
      select count(*) as total from lessons l where l.course_id = new.course_id and l.published = true
    ) as total on true
    where p.user_id = new.user_id and p.course_id = new.course_id and p.completed
  ) where user_id = new.user_id and course_id = new.course_id;
  return new;
end;
$$ language plpgsql;

create trigger trg_progress_upsert
after insert or update on progress
for each row execute function on_progress_upsert_update_enrollment();

-- RPC functions
create or replace function complete_lesson(lesson_id bigint)
returns void security definer as $$
begin
  insert into progress(user_id, course_id, lesson_id, completed)
  values (auth.uid(), (select course_id from lessons where id = lesson_id), lesson_id, true)
  on conflict (user_id, lesson_id)
  do update set completed = true, updated_at = now();
end;
$$ language plpgsql;

grant execute on function complete_lesson(bigint) to authenticated;

create or replace function simulate_payment(cart_id bigint)
returns void security definer as $$
declare
  c record;
begin
  insert into orders(user_id, total_cents, payment_status)
  select user_id, sum(price_cents), 'paid' from cart_items ci join carts c on c.id = ci.cart_id
  where ci.cart_id = cart_id group by user_id returning * into c;
  insert into order_items(order_id, course_id, price_cents)
    select c.id, ci.course_id, ci.price_cents from cart_items ci where ci.cart_id = cart_id;
  delete from cart_items where cart_id = cart_id;
end;
$$ language plpgsql;

grant execute on function simulate_payment(bigint) to authenticated;

-- RLS
alter table profiles enable row level security;
alter table categories enable row level security;
alter table courses enable row level security;
alter table sections enable row level security;
alter table lessons enable row level security;
alter table enrollments enable row level security;
alter table progress enable row level security;
alter table reviews enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table coupons enable row level security;
alter table coupon_redemptions enable row level security;
alter table qna_threads enable row level security;
alter table qna_posts enable row level security;

-- Policies
create policy "profiles select" on profiles for select using (true);
create policy "profiles update own" on profiles for update using (id = auth.uid());

create policy "categories select" on categories for select using (true);

create policy "courses select" on courses for select using (
  status = 'published' or instructor_id = auth.uid() or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "courses modify" on courses for all using (
  instructor_id = auth.uid() or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "sections select" on sections for select using (
  exists(select 1 from courses c where c.id = sections.course_id and (c.instructor_id = auth.uid() or c.status = 'published'))
);
create policy "sections modify" on sections for all using (
  exists(select 1 from courses c where c.id = sections.course_id and (c.instructor_id = auth.uid() or exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')))
);

create policy "lessons select" on lessons for select using (
  published = true or exists(select 1 from courses c where c.id = lessons.course_id and c.instructor_id = auth.uid()) or exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')
);
create policy "lessons modify" on lessons for all using (
  exists(select 1 from courses c where c.id = lessons.course_id and c.instructor_id = auth.uid()) or exists(select 1 from profiles p where p.id = auth.uid() and p.role='admin')
);

create policy "enrollments owner" on enrollments using (user_id = auth.uid());
create policy "progress owner" on progress using (user_id = auth.uid());
create policy "orders owner" on orders using (user_id = auth.uid());
create policy "order_items owner" on order_items using (exists (select 1 from orders o where o.id = order_items.order_id and o.user_id = auth.uid()));
create policy "cart owner" on carts using (user_id = auth.uid());
create policy "cart_items owner" on cart_items using (exists (select 1 from carts c where c.id = cart_items.cart_id and c.user_id = auth.uid()));
create policy "reviews owner" on reviews using (user_id = auth.uid());
create policy "coupon redemptions owner" on coupon_redemptions using (user_id = auth.uid());
create policy "qna_threads owner" on qna_threads using (author_id = auth.uid());
create policy "qna_posts owner" on qna_posts using (author_id = auth.uid());
