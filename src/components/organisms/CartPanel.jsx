import { useCartStore } from '../../stores/cart.store';
import formatCurrency from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';

export default function CartPanel() {
  const { items, remove, total } = useCartStore();
  return (
    <div>
      <h3>Carrito</h3>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.title} - {formatCurrency(i.price_cents)}{' '}
            <button onClick={() => remove(i.id)}>Quitar</button>
          </li>
        ))}
      </ul>
      <p>Total: {formatCurrency(total())}</p>
      <Link to="/checkout">Checkout</Link>
    </div>
  );
}
