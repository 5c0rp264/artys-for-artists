import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { artistName, email, social, genre } = await req.json();

    // Validation basique
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }
    if (!artistName?.trim()) {
      return NextResponse.json({ error: 'Nom d\'artiste requis' }, { status: 400 });
    }

    // Log structuré (à remplacer par Supabase insert)
    console.log('✦ Nouvelle inscription liste d\'attente:', {
      artistName,
      email,
      social: social ? `@${social.replace(/^@/, '')}` : null,
      genre,
      locale: req.headers.get('accept-language')?.split(',')[0] || 'fr',
      timestamp: new Date().toISOString(),
    });

    // TODO: Supabase insert
    // const { error } = await supabase.from('waitlist').insert({
    //   artist_name: artistName,
    //   email,
    //   social: social ? `@${social.replace(/^@/, '')}` : null,
    //   genre,
    //   locale: ...,
    // });

    // TODO: Resend welcome email
    // await resend.emails.send({ ... });

    return NextResponse.json({
      success: true,
      message: 'Inscription enregistrée',
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
