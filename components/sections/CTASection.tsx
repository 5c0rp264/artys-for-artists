'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MUSIC_GENRES = [
  'Afrobeats', 'Afropop', 'Alternatif / Indie', 'Ambient', 'Blues',
  'Chanson française', 'Classique', 'Country', 'Dance / Club',
  'Electro / EDM', 'Folk / Acoustic', 'Funk / Soul', 'Gospel / Spirituel',
  'Hip-Hop / Rap', 'House', 'Jazz', 'K-Pop', 'Latin / Reggaeton',
  'Lo-Fi', 'Métal', 'Neo Soul', 'Nouveaux sons / Expérimental',
  'Podcast / Spoken Word', 'Pop', 'R&B', 'Reggae / Dancehall',
  'Rock', 'Techno / Trance', 'Trap', 'World Music', 'Autre',
];

const schema = z.object({
  artistName: z.string().min(1, 'Ton nom d\'artiste est requis').max(60),
  email: z.string().email('Email invalide'),
  social: z.string().min(1, 'Ajoute ton Instagram ou TikTok').max(100),
  genre: z.string().min(1, 'Choisis ton genre musical'),
});

type FormData = z.infer<typeof schema>;

/* ─ Styles partagés pour les inputs ─ */
const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)',
  borderRadius: '10px',
  padding: '15px 18px',
  color: 'var(--text)',
  fontSize: '0.95rem',
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
  appearance: 'none',
  WebkitAppearance: 'none',
};

const inputFocusStyle = (el: HTMLElement) => {
  el.style.borderColor = 'var(--accent-border)';
  el.style.background = 'rgba(0,229,176,0.04)';
  el.style.boxShadow = '0 0 0 3px rgba(0,229,176,0.08)';
};

const inputBlurStyle = (el: HTMLElement, hasError = false) => {
  el.style.borderColor = hasError ? 'var(--accent-red)' : 'var(--border)';
  el.style.background = 'rgba(255,255,255,0.04)';
  el.style.boxShadow = 'none';
};

export default function CTASection() {
  const t = useTranslations('cta_section');
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useGSAP(() => {
    const items = sectionRef.current?.querySelectorAll('.cta-anim');
    items?.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        }
      );
    });
  }, { scope: sectionRef });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="cta-section"
      className="urgence-bg"
      style={{ padding: 'clamp(80px, 10vh, 140px) 0', textAlign: 'center', overflow: 'hidden', position: 'relative' }}
    >
      {/* Bg glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(900px, 130vw)', height: 'min(500px, 70vw)',
        background: 'radial-gradient(ellipse, rgba(0,229,176,0.1) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">

        {/* Eyebrow */}
        <span className="cta-anim" style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '28px',
          opacity: 0,
        }}>
          {t('eyebrow')}
        </span>

        {/* Titre */}
        <h2 className="cta-anim" style={{
          fontSize: 'clamp(2rem, 6vw, 5rem)',
          marginBottom: '24px',
          lineHeight: 1,
          opacity: 0,
          fontFamily: 'var(--font-title)',
        }}>
          <span className="highlight">{t('title_highlight')}</span><br />
          {t('title_end')}
        </h2>

        {/* Subtitle */}
        <p className="cta-anim" style={{
          maxWidth: 'min(560px, 92vw)',
          margin: '0 auto clamp(36px, 5vh, 56px)',
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          lineHeight: 1.7,
          opacity: 0,
          fontFamily: 'var(--font-body)',
        }}>
          {t('subtitle')}
        </p>

        {/* ─── FORM ─── */}
        {!submitted ? (
          <form
            className="cta-anim"
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              width: '100%',
              maxWidth: 'min(560px, 100%)',
              margin: '0 auto',
              opacity: 0,
              textAlign: 'left',
            }}
          >

            {/* Nom d'artiste */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-title)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '7px',
              }}>
                {t('field_artist_label')}
              </label>
              <input
                {...register('artistName')}
                type="text"
                placeholder={t('field_artist_placeholder')}
                style={{
                  ...inputBase,
                  borderColor: errors.artistName ? 'var(--accent-red)' : 'var(--border)',
                }}
                onFocus={e => inputFocusStyle(e.target)}
                onBlur={e => inputBlurStyle(e.target, !!errors.artistName)}
              />
              {errors.artistName && (
                <p style={{ color: 'var(--accent-red)', fontSize: '0.75rem', marginTop: '5px', fontFamily: 'var(--font-mono)' }}>
                  {errors.artistName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-title)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '7px',
              }}>
                {t('field_email_label')}
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder={t('field_email_placeholder')}
                style={{
                  ...inputBase,
                  borderColor: errors.email ? 'var(--accent-red)' : 'var(--border)',
                }}
                onFocus={e => inputFocusStyle(e.target)}
                onBlur={e => inputBlurStyle(e.target, !!errors.email)}
              />
              {errors.email && (
                <p style={{ color: 'var(--accent-red)', fontSize: '0.75rem', marginTop: '5px', fontFamily: 'var(--font-mono)' }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Instagram / TikTok */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-title)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '7px',
              }}>
                {t('field_social_label')}{' '}
                <span style={{
                  color: 'var(--accent)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.06em',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {t('field_social_badge')}
                </span>
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  @
                </span>
                <input
                  {...register('social')}
                  type="text"
                  placeholder={t('field_social_placeholder')}
                  style={{
                    ...inputBase,
                    paddingLeft: '36px',
                    borderColor: errors.social ? 'var(--accent-red)' : 'var(--border)',
                  }}
                  onFocus={e => inputFocusStyle(e.target)}
                  onBlur={e => inputBlurStyle(e.target, !!errors.social)}
                />
              </div>
              {errors.social && (
                <p style={{ color: 'var(--accent-red)', fontSize: '0.75rem', marginTop: '5px', fontFamily: 'var(--font-mono)' }}>
                  {errors.social.message}
                </p>
              )}
            </div>

            {/* Genre musical */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-title)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '7px',
              }}>
                {t('field_genre_label')}
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  {...register('genre')}
                  style={{
                    ...inputBase,
                    borderColor: errors.genre ? 'var(--accent-red)' : 'var(--border)',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    paddingRight: '44px',
                  }}
                  onFocus={e => inputFocusStyle(e.target)}
                  onBlur={e => inputBlurStyle(e.target, !!errors.genre)}
                >
                  <option value="" style={{ background: '#111111', color: 'var(--text-secondary)' }}>
                    {t('field_genre_placeholder')}
                  </option>
                  {MUSIC_GENRES.map((genre) => (
                    <option key={genre} value={genre} style={{ background: '#111111', color: '#fff' }}>
                      {genre}
                    </option>
                  ))}
                </select>
                {/* Chevron custom */}
                <span style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--accent)',
                  fontSize: '0.7rem',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  ▼
                </span>
              </div>
              {errors.genre && (
                <p style={{ color: 'var(--accent-red)', fontSize: '0.75rem', marginTop: '5px', fontFamily: 'var(--font-mono)' }}>
                  {errors.genre.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '8px',
                width: '100%',
                background: loading ? 'rgba(0,229,176,0.6)' : 'var(--accent)',
                color: '#000',
                fontFamily: 'var(--font-title)',
                fontWeight: 900,
                fontSize: '1rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '18px 32px',
                borderRadius: '10px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
                boxShadow: '0 0 40px rgba(0,229,176,0.25)',
              }}
              onMouseEnter={e => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 64px rgba(0,229,176,0.45)';
                }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(0,229,176,0.25)';
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    width: '16px', height: '16px',
                    border: '2px solid rgba(0,0,0,0.3)',
                    borderTopColor: '#000',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                  Inscription en cours…
                </>
              ) : (
                <>
                  {t('form_submit')}
                  <span style={{ fontSize: '1.1rem' }}>→</span>
                </>
              )}
            </button>

            {/* Consent */}
            <p style={{
              textAlign: 'center',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.5,
              marginTop: '4px',
            }}>
              {t('form_consent')}
            </p>
          </form>

        ) : (
          /* ─── SUCCESS STATE ─── */
          <div className="cta-anim" style={{
            maxWidth: 'min(520px, 100%)',
            margin: '0 auto',
            padding: 'clamp(28px, 5vw, 40px) clamp(22px, 5vw, 40px)',
            background: 'linear-gradient(135deg, rgba(0,229,176,0.1) 0%, rgba(0,229,176,0.04) 100%)',
            border: '1px solid var(--accent-border)',
            borderRadius: '16px',
            opacity: 0,
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '16px',
              lineHeight: 1,
            }}>
              ✦
            </div>
            <div style={{
              fontFamily: 'var(--font-title)',
              fontWeight: 900,
              fontSize: '1.4rem',
              color: 'var(--accent)',
              letterSpacing: '-0.01em',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}>
              {t('form_success_title')}
            </div>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.65,
              fontFamily: 'var(--font-body)',
            }}>
              {t('form_success_body')}
            </p>
          </div>
        )}

        {/* Note bas de page */}
        <p className="cta-anim" style={{
          marginTop: '40px',
          fontSize: '0.78rem',
          color: 'var(--text-dim)',
          fontFamily: 'var(--font-mono)',
          opacity: 0,
        }}>
          {t('note')}
        </p>
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
