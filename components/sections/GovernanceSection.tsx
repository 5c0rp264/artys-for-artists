'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function GovernanceSection() {
  const t = useTranslations('governance');
  const sectionRef = useRef<HTMLElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  useGSAP(() => {
    gsap.fromTo('.federation-ring-wrap',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.federation-ring-wrap', start: 'top 80%', once: true }
      }
    );

    gsap.fromTo('.college-node',
      { opacity: 0, scale: 0, y: 20 },
      {
        opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(2)', delay: 0.4,
        scrollTrigger: { trigger: '.federation-ring-wrap', start: 'top 80%', once: true }
      }
    );

    const govItems = sectionRef.current?.querySelectorAll('.gov-anim');
    govItems?.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: item, start: 'top 85%', once: true }
        }
      );
    });

    const cards = sectionRef.current?.querySelectorAll('.membership-card');
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        }
      );
    });

    gsap.fromTo('.ark-logo-wrap',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.ark-logo-wrap', start: 'top 92%', once: true }
      }
    );
  }, { scope: sectionRef });

  const RING_SIZE = 400;

  return (
    <section
      ref={sectionRef}
      id="governance"
      style={{ padding: 'clamp(60px, 8vh, 120px) 0', overflow: 'hidden', position: 'relative' }}
    >
      {/* Background glows */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 60% 50% at 30% 50%, rgba(0,229,176,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 80% 30%, rgba(255,224,102,0.03) 0%, transparent 60%)
        `,
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="governance-grid">

          {/* ===== COLONNE GAUCHE : Ring (haut) + Membership cards (bas) ===== */}
          <div className="gov-left-col">

            {/* 1 — Diagramme Ring (agrandi) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '50px',
              paddingBottom: '130px',
              overflowX: 'hidden',
            }}>
              {/* Wrapper scalable sur mobile */}
              <div className="ring-scale-wrapper">
              <div
                className="federation-ring-wrap"
                style={{ position: 'relative', width: RING_SIZE, height: RING_SIZE, opacity: 0 }}
              >
                {/* Outer ring */}
                <div className="ring-outer" style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: RING_SIZE, height: RING_SIZE,
                  borderRadius: '50%', border: '1px dashed rgba(0,229,176,0.15)',
                }} />

                {/* Inner ring */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: Math.round(RING_SIZE * 0.69), height: Math.round(RING_SIZE * 0.69),
                  borderRadius: '50%', border: '1px dashed rgba(0,229,176,0.25)',
                }} />

                {/* Center circle */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: Math.round(RING_SIZE * 0.38), height: Math.round(RING_SIZE * 0.38),
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(0,229,176,0.18) 0%, rgba(0,229,176,0.06) 100%)',
                  border: '2px solid var(--accent-border)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center', zIndex: 2, boxShadow: '0 0 50px rgba(0,229,176,0.12)',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-title)', fontWeight: 900, fontSize: '0.82rem',
                    letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--accent)',
                    lineHeight: 1.2, whiteSpace: 'pre-line',
                  }}>
                    {t('federation_title')}
                  </div>
                  <div style={{
                    fontSize: '0.62rem', color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)', marginTop: '6px',
                  }}>
                    {t('federation_sub')}
                  </div>
                </div>

                {/* Top node — Artistes */}
                <div className="college-node" style={{
                  position: 'absolute', top: '-48px', left: '50%', transform: 'translateX(-50%)',
                  width: '90px', height: '90px', borderRadius: '18px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px',
                  border: '1px solid var(--border)', background: 'var(--surface)', opacity: 0,
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🎤</span>
                  <span style={{
                    fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '0.62rem',
                    letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)',
                  }}>{t('college_artists')}</span>
                </div>

                {/* Bottom-left node — Fans */}
                <div className="college-node" style={{
                  position: 'absolute', bottom: '-38px', left: '-38px',
                  width: '90px', height: '90px', borderRadius: '18px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px',
                  border: '1px solid var(--border)', background: 'var(--surface)', opacity: 0,
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🎧</span>
                  <span style={{
                    fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '0.62rem',
                    letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)',
                  }}>{t('college_fans')}</span>
                </div>

                {/* Bottom-right node — Pros */}
                <div className="college-node" style={{
                  position: 'absolute', bottom: '-38px', right: '-38px',
                  width: '90px', height: '90px', borderRadius: '18px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px',
                  border: '1px solid var(--border)', background: 'var(--surface)', opacity: 0,
                }}>
                  <span style={{ fontSize: '1.5rem' }}>🏢</span>
                  <span style={{
                    fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '0.62rem',
                    letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)',
                  }}>{t('college_pros')}</span>
                </div>
              </div>
              </div>{/* fin ring-scale-wrapper */}
            </div>

            {/* 2 — Membership cards (sous le ring) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🎤', name: t('member1_name'), desc: t('member1_desc'), price: t('member1_price') },
                { icon: '🏢', name: t('member2_name'), desc: t('member2_desc'), price: t('member2_price') },
                { icon: '🎧', name: t('member3_name'), desc: t('member3_desc'), price: t('member3_price') },
              ].map((member, i) => (
                <div
                  key={i}
                  className="membership-card"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: 'clamp(14px, 2.5vw, 18px) clamp(16px, 3vw, 22px)',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '12px', transition: 'border-color 0.2s', opacity: 0,
                    gap: '12px',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,176,0.2)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{member.icon}</span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-title)', fontWeight: 700,
                        fontSize: 'clamp(0.78rem, 1.8vw, 0.9rem)',
                        marginBottom: '2px', letterSpacing: '0.03em', textTransform: 'uppercase',
                      }}>
                        {member.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
                        {member.desc}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700,
                    color: 'var(--accent)', whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    {member.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== COLONNE DROITE : Texte (haut) + Logo Ark of Culture (bas, face aux cards) ===== */}
          <div className="gov-right-col">

            {/* Texte */}
            <div className="tag gov-anim" style={{ opacity: 0 }}>{t('tag')}</div>
            <h2 className="gov-anim" style={{ marginBottom: '24px', opacity: 0 }}>
              {t('title')}{' '}
              <span className="highlight">{t('title_highlight')}</span>{' '}
              {t('title_end')}
            </h2>
            <p className="gov-anim" style={{
              color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              lineHeight: 1.75, marginBottom: '24px', opacity: 0, fontFamily: 'var(--font-body)',
            }}
              dangerouslySetInnerHTML={{ __html: t('p1') }}
            />
            <p className="gov-anim" style={{
              color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              lineHeight: 1.75, marginBottom: '40px', opacity: 0, fontFamily: 'var(--font-body)',
            }}>
              {t('p2')}
            </p>

            {/* Logo Ark of Culture — centré sous le texte */}
            <div
              className="ark-logo-wrap gov-right-logo"
              style={{
                opacity: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginTop: '56px',
              }}
            >
              <div style={{
                fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: '#aaaaaa',
                textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px',
              }}>
                Partenaire fondateur
              </div>
              <Image
                src="/ark-logo.png"
                alt="Ark of Culture"
                width={895}
                height={362}
                style={{
                  height: 'clamp(78px, 9vw, 114px)',
                  width: 'auto',
                  opacity: 0.95,
                }}
              />

              {/* Bouton Ark of Culture */}
              <button
                onClick={() => setShowPopup(true)}
                style={{
                  marginTop: '20px',
                  padding: '10px 28px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '100px',
                  color: '#ffffff',
                  fontFamily: 'var(--font-title)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                  (e.currentTarget as HTMLElement).style.color = '#ffffff';
                }}
              >
                Ark of Culture
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--accent-border)',
              borderRadius: '20px',
              padding: 'clamp(32px, 5vw, 52px) clamp(28px, 5vw, 52px)',
              maxWidth: '420px',
              width: '90vw',
              textAlign: 'center',
              boxShadow: '0 0 60px rgba(0,229,176,0.12)',
              position: 'relative',
            }}
          >
            <div style={{ fontSize: '2.4rem', marginBottom: '16px' }}>🗓</div>
            <Image
              src="/ark-logo.png"
              alt="Ark of Culture"
              width={895}
              height={362}
              style={{ height: '48px', width: 'auto', marginBottom: '24px' }}
            />
            <p style={{
              fontFamily: 'var(--font-title)', fontWeight: 800,
              fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
              color: '#ffffff', lineHeight: 1.3, marginBottom: '8px',
            }}>
              Disponible à partir du
            </p>
            <p style={{
              fontFamily: 'var(--font-mono)', fontWeight: 900,
              fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              color: 'var(--accent)', letterSpacing: '-0.02em', marginBottom: '28px',
            }}>
              1er Avril 2026
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: '10px 32px',
                background: 'rgba(0,229,176,0.1)',
                border: '1px solid var(--accent-border)',
                borderRadius: '100px',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Fermer
            </button>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'none', border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        .governance-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 8vw, 64px);
        }
        .gov-left-col  { order: 2; }
        .gov-right-col { order: 1; }

        /* Ring : scale responsive pour mobile */
        .ring-scale-wrapper {
          display: flex;
          justify-content: center;
        }
        @media (max-width: 500px) {
          .ring-scale-wrapper {
            transform: scale(0.78);
            transform-origin: top center;
          }
        }
        @media (max-width: 380px) {
          .ring-scale-wrapper {
            transform: scale(0.62);
            transform-origin: top center;
          }
        }

        @media (min-width: 900px) {
          .governance-grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(60px, 8vw, 100px);
            align-items: start;
          }
          .gov-left-col  { order: 1; }
          .gov-right-col { order: 2; }
          .gov-right-logo { margin-top: 0; }
        }
      `}</style>
    </section>
  );
}
