import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY manquantes dans .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WaitlistInsert = {
  artist_name: string;
  email: string;
  instagram?: string;
  tiktok?: string;
  genre: string;
  locale: string;
};

export async function insertWaitlist(data: WaitlistInsert): Promise<void> {
  const { error } = await supabase.from('waitlist').insert({
    artist_name: data.artist_name,
    email: data.email.toLowerCase().trim(),
    instagram: data.instagram || null,
    tiktok: data.tiktok || null,
    genre: data.genre,
    locale: data.locale,
  });

  if (error) {
    // Violation unique = email déjà inscrit
    if (error.code === '23505') throw new Error('DUPLICATE_EMAIL');
    throw new Error(error.message);
  }
}
