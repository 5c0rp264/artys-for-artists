import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { useTranslations } from '@/i18n/useTranslations';

/* ─── Mockup iPhone animé ─────────────────────────────────────── */
function IPhoneMockup() {
  const [fans, setFans] = useState(870);
  const [flash, setFlash] = useState<'fans' | 'royaltips' | null>(null);
  const [addedFans, setAddedFans] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      const added = Math.floor(Math.random() * 4) + 1;
      setFans(f => f + added);
      setAddedFans(added);
      setFlash('fans');
      setTimeout(() => setFlash('royaltips'), 300);
      setTimeout(() => setFlash(null), 900);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const royaltips = fans * 6;
  const fmt = (n: number) => n.toLocaleString('fr-FR');

  return (
    <div style={{
      width: 'clamp(220px, 28vw, 300px)',
      height: 'clamp(448px, 57vw, 612px)',
      background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
      borderRadius: '55px',
      padding: '10px',
      boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px rgba(0,229,176,0.08)',
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
        width: '90px', height: '26px', background: '#000',
        borderRadius: '0 0 18px 18px', zIndex: 10,
      }} />

      {/* Écran */}
      <div style={{
        width: '100%', height: '100%', background: '#000',
        borderRadius: '46px', overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          padding: 'clamp(28px, 4vw, 36px) clamp(14px, 2vw, 18px) 16px',
          height: '100%', display: 'flex', flexDirection: 'column', gap: '0.65rem',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}>

          {/* Header artiste */}
          <div style={{ textAlign: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #00e5b0, #00b890)',
              margin: '0 auto 0.4rem', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '1.3rem',
              boxShadow: '0 0 20px rgba(0,229,176,0.4)',
            }}>🎤</div>
            <div style={{
              fontSize: '0.95rem', fontWeight: 800,
              background: 'linear-gradient(135deg, #00e5b0, #00b890)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Malcom</div>
            <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)' }}>Artiste Artys</div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            {[
              { id: 'fans', val: fmt(fans), label: 'FANS' },
              { id: 'royaltips', val: fmt(royaltips) + '€', label: 'ROYALTIPS/MOIS' },
            ].map(({ id, val, label }) => (
              <div key={id} style={{
                background: flash === id ? 'rgba(0,229,176,0.12)' : '#1a1a1a',
                borderRadius: '10px', padding: '0.55rem',
                textAlign: 'center', position: 'relative', overflow: 'hidden',
                border: `1px solid ${flash === id ? 'rgba(0,229,176,0.3)' : 'transparent'}`,
                transition: 'background 0.3s, border-color 0.3s',
              }}>
                <div style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', fontWeight: 900,
                  color: '#00e5b0', fontFamily: 'monospace', whiteSpace: 'nowrap',
                  transition: 'transform 0.2s',
                  transform: flash === id ? 'scale(1.08)' : 'scale(1)',
                }}>{val}</div>
                <div style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Calcul Royaltips */}
          <div style={{
            background: 'rgba(0,229,176,0.05)', border: '1px solid rgba(0,229,176,0.2)',
            borderRadius: '8px', padding: '0.5rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.62rem', color: '#00e5b0', fontWeight: 600 }}>6€ par fan et par mois</div>
            <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px', whiteSpace: 'nowrap' }}>
              {fmt(fans)} × 6€ = <span style={{ color: '#00e5b0', fontWeight: 700 }}>{fmt(royaltips)}€</span>
            </div>
          </div>

          {/* Mini chart */}
          <div style={{
            height: '52px', background: 'linear-gradient(135deg, rgba(0,229,176,0.1), rgba(0,229,176,0.03))',
            borderRadius: '8px', display: 'flex', alignItems: 'flex-end',
            padding: '8px 10px 6px', gap: '3px',
          }}>
            {[40, 55, 45, 65, 58, 70, 62, 80, 75, 88].map((h, i) => (
              <div key={i} style={{
                flex: 1, background: i === 9 ? '#00e5b0' : `rgba(0,229,176,${0.2 + i * 0.06})`,
                borderRadius: '3px 3px 0 0', height: `${h}%`,
                transition: 'height 0.4s ease',
              }} />
            ))}
          </div>

          {/* Activité récente */}
          <div style={{ background: '#1a1a1a', borderRadius: '10px', padding: '0.6rem' }}>
            <div style={{ fontSize: '0.58rem', color: '#00e5b0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              Activité récente
            </div>
            {[
              { icon: '➕', text: `+${addedFans} fans aujourd'hui` },
              { icon: '💰', text: `+${fmt(addedFans * 6)}€ Royaltips` },
              { icon: '🎵', text: '37 streams' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.58rem', color: 'rgba(255,255,255,0.65)', marginBottom: i < 2 ? '0.2rem' : 0 }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'rgba(0,229,176,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', flexShrink: 0 }}>
                  {item.icon}
                </div>
                {item.text}
              </div>
            ))}
          </div>

          {/* CTA button */}
          <button style={{
            background: 'linear-gradient(135deg, #00e5b0, #00b890)',
            color: '#000', border: 'none', borderRadius: '10px',
            padding: '0.5rem', fontWeight: 700, fontSize: '0.62rem',
            cursor: 'pointer', width: '100%', marginTop: 'auto',
            boxShadow: '0 4px 16px rgba(0,229,176,0.3)',
          }}>
            Voir les analytics complets
          </button>

        </div>
      </div>
    </div>
  );
}


export default function HeroSection() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!titleRef.current) return;

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

    gsap.fromTo('.hero-mockup',
      { opacity: 0, y: 30, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 1.1 }
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

          <div className="hero-title-row" style={{ marginBottom: 0 }}>

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
            <span style={{ display: 'block', color: 'var(--secondary)' }}>
              {titleWords3.slice(0, -1).map((word, i) => (
                <span key={`l3-${i}`} className="hero-word"
                  style={{ display: 'inline-block', marginRight: '0.22em', opacity: 0 }}>
                  {word}
                </span>
              ))}
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

          <div className="hero-mockup" style={{ opacity: 0 }}>
            <IPhoneMockup />
          </div>

          </div>

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
              <div style={{
                width: '32px', height: '1px',
                background: 'rgba(0,229,176,0.3)',
                marginBottom: '14px',
              }} />
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
        .hero-title-row {
          display: flex;
          align-items: center;
          gap: clamp(24px, 4vw, 48px);
          margin-bottom: clamp(16px, 2.5vh, 28px);
        }
        .hero-mockup {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .hero-title-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-mockup {
            align-self: center;
          }
        }
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
