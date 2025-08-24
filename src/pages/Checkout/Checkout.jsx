import CheckoutSummary from '../../components/organisms/CheckoutSummary';
import Button from '../../components/atoms/Button';
import { useCartStore } from '../../stores/cart.store';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

async function processPayment() {
  // TODO: integrar Stripe
  return true;
}

export default function Checkout() {
  const { clear } = useCartStore();
  const navigate = useNavigate();

  const handlePay = async () => {
    await processPayment();
    await supabase.rpc('simulate_payment', { cart_id: 0 });
    clear();
    navigate('/orders');
  };

  return (
    <div>
      <CheckoutSummary />
      <Button onClick={handlePay}>Pagar</Button>
    </div>
  );
}
