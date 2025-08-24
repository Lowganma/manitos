import { useAuthStore } from '../../stores/auth.store';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../services/supabaseClient';

export default function Orders() {
  const user = useAuthStore((s) => s.user);
  const { data } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('orders').select('*').eq('user_id', user.id);
      if (error) throw error;
      return data;
    },
    enabled: Boolean(user?.id)
  });
  return (
    <div>
      <h1>Pedidos</h1>
      <ul>
        {data?.map((o) => (
          <li key={o.id}>
            Pedido #{o.id} - {o.payment_status}
          </li>
        ))}
      </ul>
    </div>
  );
}
