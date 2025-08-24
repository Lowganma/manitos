import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <main style={{ padding: '1rem' }}>
      <Outlet />
    </main>
  );
}
