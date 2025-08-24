import { useParams } from 'react-router-dom';
import useCourse from '../hooks/useCourse';
import useSections from '../hooks/useSections';
import useLessons from '../hooks/useLessons';
import CourseOutline from '../components/organisms/CourseOutline';
import Button from '../components/atoms/Button';
import { useCartStore } from '../stores/cart.store';

export default function CourseDetail() {
  const { courseId } = useParams();
  const { data: course } = useCourse(courseId);
  const { data: sections } = useSections(courseId);
  const { data: lessons } = useLessons(courseId);
  const add = useCartStore((s) => s.add);
  if (!course) return null;
  return (
    <div>
      <h1>{course.title}</h1>
      <Button onClick={() => add(course)}>Agregar al carrito</Button>
      <CourseOutline sections={sections || []} lessons={lessons || []} courseId={courseId} />
    </div>
  );
}
