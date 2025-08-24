import formatCurrency from '../../utils/formatCurrency';

export default function PriceTag({ price_cents, currency = 'USD' }) {
  return <span>{formatCurrency(price_cents, currency)}</span>;
}
