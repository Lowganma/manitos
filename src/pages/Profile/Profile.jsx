import { useAuthStore } from '../../stores/auth.store';

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  return (
    <div>
      <h1>Perfil</h1>
      <p>{user?.email}</p>
    </div>
  );
}
