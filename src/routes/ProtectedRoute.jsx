import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthStore } from '../stores/auth.store';

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuthStore();
  if (loading) return null;
  const role = user?.user_metadata?.role;
  if (!user) {
    Swal.fire('Debes iniciar sesión');
    return <Navigate to="/login" replace />;
  }
  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
