import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabaseClient';

export default function useSections(courseId) {
  return useQuery({
    queryKey: ['sections', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('course_id', courseId)
        .order('position');
      if (error) throw error;
      return data;
    },
    enabled: Boolean(courseId)
  });
}
