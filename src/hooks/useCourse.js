import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabaseClient';

export default function useCourse(id) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('courses').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
    enabled: Boolean(id)
  });
}
