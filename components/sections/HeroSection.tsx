'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function HeroSection() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!titleRef.current) return;

    // Mots classiques
    const words = titleRef.current.querySelectorAll('.hero-word');
    gsap.fromTo(words,
      { opacity: 0, y: 60, rotateX: -20 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.08, ease: 'power4.out', delay: 0.3 }
    );

    gsap.fromTo('.hero-sub, .hero-ctas',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.9, stagger: 0.15, ease: 'power3.out' }
    );

    gsap.fromTo('.hero-kicker',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.1, ease: 'power3.out' }
    );

    // Soulignement SVG "algos." — se dessine après l'animation des mots
    const underlinePath = document.querySelector('.algos-underline path') as SVGPathElement | null;
    if (underlinePath) {
      const len = underlinePath.getTotalLength();
      gsap.set(underlinePath, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(underlinePath, {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power3.inOut',
        delay: 1.35,
      });
    }

    // GIF — fade-in + légère remontée après les mots
    gsap.fromTo('.hero-gif',
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 1.1 }
    );
  }, { scope: containerRef });

  const titleWords1 = t('title_1').split(' ');
  const titleWords2 = [t('title_2')];
  const titleWordsFans = [t('title_highlight')];
  const titleWords3 = t('title_3').split(' ');

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'clamp(80px, 12vh, 120px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,229,176,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,176,0.04) 1px, transparent 1px)
        `,
        backgroundSize: 'clamp(40px, 6vw, 80px) clamp(40px, 6vw, 80px)',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(900px, 140vw)',
        height: 'min(600px, 80vw)',
        background: 'radial-gradient(ellipse, rgba(0,229,176,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{ paddingBottom: 'clamp(40px, 6vh, 80px)' }}>

          {/* Kicker badge */}
          <div className="hero-kicker" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: 'clamp(20px, 3vh, 36px)',
            opacity: 0,
            flexWrap: 'wrap',
          }}>
            <span style={{
              background: 'rgba(0,229,176,0.1)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6rem, 1.5vw, 0.68rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '5px 12px',
              borderRadius: '100px',
            }}>
              {t('badge')}
            </span>
            <span style={{
              height: '1px',
              width: '40px',
              background: 'var(--accent)',
              opacity: 0.4,
              display: 'block',
            }} />
            <div className="waveform">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="wave-bar" />
              ))}
            </div>
          </div>

          {/* ── Wrapper H1 + GIF ── */}
          <div className="hero-title-row" style={{ marginBottom: 0 }}>

          {/* H1 — Word Split */}
          <h1
            ref={titleRef}
            style={{
              maxWidth: 'min(860px, 100%)',
              marginBottom: 'clamp(16px, 2.5vh, 28px)',
              perspective: '800px',
              fontFamily: 'var(--font-title)',
              flex: '1 1 auto',
            }}
          >
            <span style={{ display: 'block' }}>
              {titleWords1.map((word, i) => (
                <span key={`l1-${i}`} className="hero-word"
                  style={{ display: 'inline-block', marginRight: '0.22em', opacity: 0 }}>
                  {word}
                </span>
              ))}
            </span>
            <span style={{ display: 'block' }}>
              {titleWords2.map((word, i) => (
                <span key={`l2-${i}`} className="hero-word"
                  style={{ display: 'inline-block', marginRight: '0.22em', opacity: 0 }}>
                  {word}
                </span>
              ))}
              {titleWordsFans.map((word, i) => (
                <span key={`fans-${i}`} className="hero-word"
                  style={{ display: 'inline-block', marginRight: '0.22em', opacity: 0, color: 'var(--accent)' }}>
                  {word},
                </span>
              ))}
            </span>
            {/* Ligne 3 — "pas avec les algos." */}
            <span style={{ display: 'block', color: 'var(--secondary)' }}>
              {titleWords3.slice(0, -1).map((word, i) => (
                <span key={`l3-${i}`} className="hero-word"
                  style={{ display: 'inline-block', marginRight: '0.22em', opacity: 0 }}>
                  {word}
                </span>
              ))}
              {/* Dernier mot "algos." avec soulignement SVG animé */}
              <span
                className="hero-word"
                style={{
                  display: 'inline-block',
                  marginRight: '0.22em',
                  opacity: 0,
                  position: 'relative',
                }}
              >
                {titleWords3[titleWords3.length - 1]}
                <svg
                  className="algos-underline"
                  aria-hidden="true"
                  viewBox="0 0 220 14"
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: '-2%',
                    width: '104%',
                    height: '14px',
                    overflow: 'visible',
                    pointerEvents: 'none',
                  }}
                >
                  <path
                    d="M 4,8 Q 55,2 110,8 Q 165,14 216,7"
                    fill="none"
                    stroke="#fa5655"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </h1>

          {/* GIF animé — fade-in après les mots */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="hero-gif"
            src="/artys-anim.gif"
            alt="Artys animation"
            width={220}
            height={220}
          />

          </div>{/* fin .hero-title-row */}

          {/* Subtitle */}
          <p
            className="hero-sub"
            style={{
              maxWidth: 'min(600px, 100%)',
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
              lineHeight: 1.7,
              paddingTop: 'clamp(12px, 2vh, 20px)',
              marginBottom: 'clamp(24px, 3.5vh, 40px)',
              opacity: 0,
              fontFamily: 'var(--font-body)',
            }}
          >
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div
            className="hero-ctas"
            style={{
              display: 'flex',
              gap: 'clamp(10px, 2vw, 16px)',
              alignItems: 'center',
              flexWrap: 'wrap',
              opacity: 0,
            }}
          >
            <a href="#cta-section" className="btn-primary"
              onClick={e => { e.preventDefault(); document.querySelector('#cta-section')?.scrollIntoView({ behavior: 'smooth' }); }}>
              {t('cta_primary')}
            </a>
            <a href="#comparison" className="btn-secondary"
              onClick={e => { e.preventDefault(); document.querySelector('#comparison')?.scrollIntoView({ behavior: 'smooth' }); }}>
              {t('cta_secondary')}
            </a>
          </div>
        </div>

        {/* Hero Stats — 2 cartes larges */}
        <div className="hero-stats-grid">
          {[
            {
              number: t('stat1_number'),
              subtitle: t('stat1_subtitle'),
              body: t('stat1_body'),
            },
            {
              number: t('stat2_number'),
              subtitle: t('stat2_subtitle'),
              body: t('stat2_body'),
            },
          ].map((stat, i) => (
            <div key={i} className="hero-stat-item">
              {/* Titre / chiffre clé */}
              <div style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 900,
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                letterSpacing: '-0.03em',
                color: 'var(--accent)',
                lineHeight: 1.1,
                marginBottom: '6px',
              }}>
                {stat.number}
              </div>
              {/* Sous-titre */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)',
                color: 'var(--accent)',
                opacity: 0.7,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}>
                {stat.subtitle}
              </div>
              {/* Séparateur */}
              <div style={{
                width: '32px', height: '1px',
                background: 'rgba(0,229,176,0.3)',
                marginBottom: '14px',
              }} />
              {/* Corps */}
              <div style={{
                fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                fontFamily: 'var(--font-body)',
              }}>
                {stat.body}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Wrapper titre + GIF ── */
        .hero-title-row {
          display: flex;
          align-items: center;
          gap: clamp(24px, 4vw, 48px);
          margin-bottom: clamp(16px, 2.5vh, 28px);
        }

        /* GIF — taille adaptative */
        .hero-gif {
          flex-shrink: 0;
          width: clamp(300px, 36vw, 520px);
          height: clamp(300px, 36vw, 520px);
          object-fit: contain;
          opacity: 0;
        }

        /* Mobile : GIF sous le titre */
        @media (max-width: 640px) {
          .hero-title-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-gif {
            width: clamp(180px, 65vw, 320px);
            height: clamp(180px, 65vw, 320px);
            align-self: center;
          }
        }
        @media (max-width: 360px) {
          .hero-gif {
            width: clamp(140px, 55vw, 200px);
            height: clamp(140px, 55vw, 200px);
          }
        }

        /* Stats grid — 2 cartes larges */
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(12px, 2vw, 20px);
          margin-top: clamp(40px, 6vh, 80px);
          padding-bottom: clamp(32px, 5vh, 60px);
        }
        .hero-stat-item {
          display: flex;
          flex-direction: column;
          padding: clamp(24px, 3vw, 36px) clamp(24px, 3.5vw, 40px);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          transition: border-color 0.25s;
        }
        .hero-stat-item:hover {
          border-color: rgba(0,229,176,0.25);
        }
        @media (max-width: 480px) {
          .hero-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
