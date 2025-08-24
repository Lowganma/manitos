import styled from 'styled-components';
import CourseCard from '../molecules/CourseCard';
import EmptyState from '../atoms/EmptyState';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

export default function CourseGrid({ courses }) {
  if (!courses || courses.length === 0) return <EmptyState message="No hay cursos" />;
  return (
    <Grid>
      {courses.map((c) => (
        <CourseCard key={c.id} course={c} />
      ))}
    </Grid>
  );
}
