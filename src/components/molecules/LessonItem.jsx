import { Link } from 'react-router-dom';

export default function LessonItem({ lesson, courseId }) {
  return (
    <li>
      <Link to={`/lesson/${courseId}/${lesson.id}`}>{lesson.title}</Link>
    </li>
  );
}
