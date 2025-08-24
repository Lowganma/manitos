import { useAuthStore } from '../../stores/auth.store';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../services/supabaseClient';
import CourseGrid from '../../components/organisms/CourseGrid';
import { Link } from 'react-router-dom';

export default function Instructor() {
  const user = useAuthStore((s) => s.user);
  const { data } = useQuery({
    queryKey: ['instructor-courses', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*').eq('instructor_id', user.id);
      if (error) throw error;
      return data;
    },
    enabled: Boolean(user?.id)
  });
  return (
    <div>
      <h1>Mis Cursos</h1>
      <Link to="/instructor/builder/new">Nuevo curso</Link>
      <CourseGrid courses={data || []} />
    </div>
  );
}
