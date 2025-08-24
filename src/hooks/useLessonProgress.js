import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabaseClient';
import { useAuthStore } from '../stores/auth.store';

export default function useLessonProgress(courseId, lessonId) {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ['progress', user?.id, lessonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('lesson_id', lessonId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: Boolean(user?.id && lessonId)
  });
}
