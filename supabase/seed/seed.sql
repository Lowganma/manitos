insert into categories(name, slug) values ('Programming', 'programming');

insert into profiles(id, full_name, role) values
  ('00000000-0000-0000-0000-000000000001','Instructor Uno','instructor'),
  ('00000000-0000-0000-0000-000000000002','Estudiante Uno','student');

insert into courses(instructor_id,title,slug,description,price_cents,status,category_id)
values ('00000000-0000-0000-0000-000000000001','Curso Demo','curso-demo','Curso de prueba',1000,'published',1);

insert into sections(course_id,title,position) values (1,'Introducción',1);
insert into lessons(course_id,section_id,title,position,free_preview)
values (1,1,'Bienvenida',1,true);
