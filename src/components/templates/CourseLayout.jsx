import { Outlet } from 'react-router-dom';

export default function CourseLayout() {
  return (
    <div style={{ padding: '1rem' }}>
      <Outlet />
    </div>
  );
}
