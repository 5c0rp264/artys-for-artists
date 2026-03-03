'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: '🎛', key: 'feat1' },
  { icon: '🚀', key: 'feat2' },
  { icon: '💸', key: 'feat3' },
  { icon: '⛓', key: 'feat4' },
];

export default function BackstageSection() {
  const t = useTranslations('backstage');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const items = sectionRef.current?.querySelectorAll('.bs-anim');
    items?.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: item, start: 'top 85%', once: true }
        }
      );
    });

    gsap.fromTo('.mock-phone',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.mock-phone', start: 'top 80%', once: true }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="backstage"
      style={{
        padding: 'clamp(80px, 10vh, 140px) 0',
        background: 'var(--bg2)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', bottom: '-30%', right: '-10%',
        width: 'min(700px, 90vw)', height: 'min(700px, 90vw)',
        background: 'radial-gradient(ellipse, rgba(0,229,176,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div className="backstage-grid">

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="tag bs-anim" style={{ opacity: 0 }}>{t('tag')}</div>
            <h2 className="bs-anim" style={{ marginBottom: '24px', opacity: 0 }}>
              {t('title')}{' '}
              <span className="highlight">{t('title_highlight')}</span>{' '}
              {t('title_end')}
            </h2>
            <p className="bs-anim" style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              lineHeight: 1.75,
              marginBottom: '40px',
              opacity: 0,
              fontFamily: 'var(--font-body)',
            }}>
              {t('subtitle')}
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
              {features.map((feat) => (
                <div key={feat.key} className="bs-anim" style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', opacity: 0 }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: 'rgba(0,229,176,0.08)', border: '1px solid var(--accent-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem', flexShrink: 0,
                  }}>
                    {feat.icon}
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '0.95rem',
                      marginBottom: '4px', letterSpacing: '0.02em', textTransform: 'uppercase',
                    }}>
                      {t(`${feat.key}_title` as any)}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>
                      {t(`${feat.key}_desc` as any)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT — Mock UI */}
          <div style={{ perspective: '1000px' }}>
            <div
              className="mock-phone"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
                opacity: 0,
                /* Limite la largeur sur mobile pour ne pas déborder */
                maxWidth: '100%',
              }}
            >
              {/* Header */}
              <div style={{
                background: '#0d0d0d', padding: '18px 20px 14px', borderBottom: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--accent) 0%, #00a878 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-title)', fontWeight: 900, color: '#000', fontSize: '0.9rem',
                }}>
                  AK
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-title)', fontSize: '0.88rem', fontWeight: 700, marginBottom: '2px' }}>
                    Aylan K.
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    ✦ Backstage Officiel
                  </div>
                </div>
                <div style={{
                  background: 'rgba(0,229,176,0.12)', border: '1px solid var(--accent-border)',
                  color: 'var(--accent)', fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
                  padding: '4px 10px', borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  Guilde active
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--border)' }}>
                {[
                  { num: '847', label: 'Membres' },
                  { num: '2 541 $', label: 'Royaltips/mois' },
                  { num: '+34', label: 'Ce mois-ci' },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: 'var(--surface)', padding: 'clamp(12px, 2vw, 18px) clamp(10px, 2vw, 20px)',
                    textAlign: 'center', borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div className="mock-stat-num" style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)' }}>{stat.num}</div>
                    <div className="mock-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Missions */}
              <div style={{ padding: 'clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px)' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: '#9ca3af', marginBottom: '12px',
                }}>
                  ✦ Missions actives
                </div>

                {[
                  { icon: '🎵', title: 'Partage le nouveau single', reward: '+50 XP · +2 $ Royaltip' },
                  { icon: '👥', title: 'Invite un ami dans la Guilde', reward: '+100 XP · Merch exclusif' },
                  { icon: '🎬', title: 'Co-produis le prochain clip', reward: 'Part de revenus · Smart contract' },
                ].map((mission, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: 'clamp(10px, 2vw, 14px) clamp(10px, 2vw, 16px)',
                    background: '#0d0d0d', border: '1px solid var(--border)',
                    borderRadius: '10px', marginBottom: '8px',
                  }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{mission.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 500, marginBottom: '2px', fontFamily: 'var(--font-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {mission.title}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                        {mission.reward}
                      </div>
                    </div>
                    <span style={{ color: '#6b7280', fontSize: '0.8rem', flexShrink: 0 }}>›</span>
                  </div>
                ))}
              </div>

              {/* Revenue block */}
              <div style={{
                margin: '0 clamp(14px, 3vw, 24px) clamp(14px, 3vw, 24px)',
                background: 'linear-gradient(135deg, rgba(0,229,176,0.08) 0%, rgba(0,229,176,0.02) 100%)',
                border: '1px solid var(--accent-border)', borderRadius: '12px',
                padding: 'clamp(14px, 3vw, 20px)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>
                    Revenus Royaltips
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-title)', fontWeight: 900,
                    fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                    letterSpacing: '-0.04em', color: 'var(--accent)', lineHeight: 1,
                  }}>
                    2 541 $
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--secondary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                    ce mois-ci · 847 superfans
                  </div>
                </div>
                <div style={{
                  background: 'rgba(0,229,176,0.15)', color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                  padding: '8px 12px', borderRadius: '8px', fontWeight: 700, flexShrink: 0,
                }}>
                  ↑ +18%
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .backstage-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(48px, 7vh, 80px);
        }
        @media (min-width: 900px) {
          .backstage-grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(60px, 8vw, 100px);
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
