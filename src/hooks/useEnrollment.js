import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabaseClient';
import { useAuthStore } from '../stores/auth.store';

export default function useEnrollment(courseId) {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ['enrollment', user?.id, courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: Boolean(user?.id && courseId)
  });
}
