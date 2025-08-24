import { useCartStore } from '../../stores/cart.store';
import formatCurrency from '../../utils/formatCurrency';

export default function CheckoutSummary() {
  const { items, total } = useCartStore();
  return (
    <div>
      <h2>Resumen</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.title} - {formatCurrency(i.price_cents)}
          </li>
        ))}
      </ul>
      <p>Total: {formatCurrency(total())}</p>
    </div>
  );
}
