import RatingStars from '../molecules/RatingStars';

export default function ReviewList({ reviews = [] }) {
  if (reviews.length === 0) return <p>No hay reseñas</p>;
  return (
    <ul>
      {reviews.map((r) => (
        <li key={r.id}>
          <RatingStars value={r.rating} /> {r.title}
        </li>
      ))}
    </ul>
  );
}
