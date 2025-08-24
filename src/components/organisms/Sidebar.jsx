import { useUIStore } from '../../stores/ui.store';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const open = useUIStore((s) => s.sidebarOpen);
  const close = useUIStore((s) => s.closeSidebar);
  if (!open) return null;
  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '200px',
        height: '100%',
        background: '#fff',
        borderRight: '1px solid #e5e7eb',
        padding: '1rem'
      }}
    >
      <button onClick={close}>Cerrar</button>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
