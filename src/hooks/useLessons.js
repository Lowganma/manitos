import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabaseClient';

export default function useLessons(courseId) {
  return useQuery({
    queryKey: ['lessons', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('position');
      if (error) throw error;
      return data;
    },
    enabled: Boolean(courseId)
  });
}
