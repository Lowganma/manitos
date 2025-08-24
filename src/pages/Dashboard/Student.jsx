import { useAuthStore } from '../../stores/auth.store';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../services/supabaseClient';
import CourseGrid from '../../components/organisms/CourseGrid';

export default function Student() {
  const user = useAuthStore((s) => s.user);
  const { data } = useQuery({
    queryKey: ['my-courses', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*, enrollments!inner(*)')
        .eq('enrollments.user_id', user.id);
      if (error) throw error;
      return data;
    },
    enabled: Boolean(user?.id)
  });
  return (
    <div>
      <h1>Mis Cursos</h1>
      <CourseGrid courses={data || []} />
    </div>
  );
}
