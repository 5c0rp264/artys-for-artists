import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let supabase: SupabaseClient | null = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export const isSupabaseConfigured = !!supabase;

export type WaitlistInsert = {
  artist_name: string;
  email: string;
  instagram?: string;
  tiktok?: string;
  genre: string;
  locale: string;
};

export async function insertWaitlist(data: WaitlistInsert): Promise<void> {
  if (!supabase) {
    console.warn('[Waitlist] Supabase not configured — skipping insert');
    return;
  }

  const { error } = await supabase.from('waitlist').insert({
    artist_name: data.artist_name,
    email: data.email.toLowerCase().trim(),
    instagram: data.instagram || null,
    tiktok: data.tiktok || null,
    genre: data.genre,
    locale: data.locale,
  });

  if (error) {
    if (error.code === '23505') throw new Error('DUPLICATE_EMAIL');
    throw new Error(error.message);
  }
}
