import useCourses from '../hooks/useCourses';
import CourseGrid from '../components/organisms/CourseGrid';

export default function Landing() {
  const { data } = useCourses();
  return (
    <div>
      <h1>Cursos Destacados</h1>
      <CourseGrid courses={data || []} />
    </div>
  );
}
