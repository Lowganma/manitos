import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Sidebar from '../organisms/Sidebar';
import CartPanel from '../organisms/CartPanel';

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ padding: '1rem' }}>
        <Outlet />
      </div>
      <CartPanel />
    </>
  );
}
