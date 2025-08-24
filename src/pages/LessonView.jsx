import { useParams } from 'react-router-dom';
import useLessons from '../hooks/useLessons';
import LessonPlayer from '../components/organisms/LessonPlayer';
import Button from '../components/atoms/Button';
import { supabase } from '../services/supabaseClient';

export default function LessonView() {
  const { courseId, lessonId } = useParams();
  const { data: lessons } = useLessons(courseId);
  const lesson = lessons?.find((l) => String(l.id) === lessonId);
  const handleComplete = async () => {
    await supabase.rpc('complete_lesson', { lesson_id: lesson.id });
  };
  if (!lesson) return null;
  return (
    <div>
      <h2>{lesson.title}</h2>
      <LessonPlayer lesson={lesson} />
      <Button onClick={handleComplete}>Marcar como completada</Button>
    </div>
  );
}
