import styled from 'styled-components';
import PriceTag from './PriceTag';
import { Link } from 'react-router-dom';

const Card = styled.article`
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const Thumb = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export default function CourseCard({ course }) {
  return (
    <Card>
      <Thumb src={course.thumbnail_url} alt={course.title} />
      <div style={{ padding: '1rem' }}>
        <h3>{course.title}</h3>
        <PriceTag price_cents={course.price_cents} currency={course.currency} />
        <Link to={`/course/${course.id}`}>Ver curso</Link>
      </div>
    </Card>
  );
}
