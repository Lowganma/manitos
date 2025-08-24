export default function RatingStars({ value = 0 }) {
  const stars = Array.from({ length: 5 }, (_, i) => (i < value ? '★' : '☆'));
  return <div aria-label={`rating-${value}`}>{stars.join('')}</div>;
}
