import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import { useUIStore } from '../../stores/ui.store';

export default function Navbar() {
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
      <Link to="/">Manitos</Link>
      <Button style={{ float: 'right' }} onClick={toggleTheme} aria-label="toggle-theme">
        Tema
      </Button>
    </nav>
  );
}
