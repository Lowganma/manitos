import { create } from 'zustand';
import { supabase } from '../services/supabaseClient';

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  init: async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, loading: false });
  },
  signIn: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    set({ user: data?.user ?? null, loading: false });
    return { data, error };
  },
  signUp: async (email, password) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });
    set({ user: data?.user ?? null, loading: false });
    return { data, error };
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  }
}));
