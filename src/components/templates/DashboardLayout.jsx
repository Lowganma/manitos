import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Sidebar from '../organisms/Sidebar';

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ padding: '1rem', marginLeft: '200px' }}>
        <Outlet />
      </div>
    </>
  );
}
