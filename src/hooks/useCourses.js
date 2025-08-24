import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabaseClient';

export default function useCourses(params = {}) {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: async () => {
      let query = supabase.from('courses').select('*').eq('status', 'published');
      if (params.text) query = query.ilike('title', `%${params.text}%`);
      if (params.category) query = query.eq('category_id', params.category);
      if (params.order === 'price') query = query.order('price_cents');
      else query = query.order('created_at', { ascending: false });
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
}
