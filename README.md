# Manitos E-learning

Plataforma tipo Udemy para venta de cursos.

## Requisitos
- Node.js >= 20
- Cuenta y proyecto en [Supabase](https://supabase.com)

## Instalación
```bash
npm install
cp .env.example .env # completar con credenciales de Supabase
```

### Base de datos
Ejecuta las migraciones y datos de ejemplo en tu proyecto Supabase:
```bash
supabase db push < supabase/migrations/0001_init.sql
supabase db push < supabase/seed/seed.sql
```

## Scripts
- `npm run dev` inicia entorno de desarrollo
- `npm run build` genera build de producción
- `npm run preview` sirve el build
- `npm run lint` ejecuta ESLint
- `npm run format` aplica Prettier

## Estructura
```
src/
  components/...
  pages/...
  hooks/...
  stores/...
  theme/...
  utils/...
supabase/
  migrations/0001_init.sql
  seed/seed.sql
```

## Roadmap
- Integración Stripe real
- Certificados
- Quizzes
- CI/CD
