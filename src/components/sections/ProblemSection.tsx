import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import { useTranslations } from '@/i18n/useTranslations';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
  const t = useTranslations('problem');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const items = sectionRef.current?.querySelectorAll('.anim-item');
    items?.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
          delay: i * 0.1,
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="problem"
      style={{
        padding: 'clamp(80px, 10vh, 140px) 0',
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 50%, var(--bg) 100%)',
        position: 'relative',
      }}
    >
      <div className="container">
        <div className="problem-grid">

          <div className="anim-item" style={{ opacity: 0 }}>
            <div className="tag">{t('tag')}</div>
            <h2 style={{ marginBottom: '24px' }}>
              {t('title')}{' '}
              <span className="highlight-red">{t('title_highlight')}</span>
              {t('title_end')}
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              lineHeight: 1.75,
              marginBottom: '20px',
              fontFamily: 'var(--font-body)',
            }}
              dangerouslySetInnerHTML={{ __html: t('p1') }}
            />
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              lineHeight: 1.75,
              marginBottom: '28px',
              fontFamily: 'var(--font-body)',
            }}>
              {t('p2')}
            </p>

            <div style={{
              background: 'linear-gradient(135deg, rgba(255,77,77,0.06) 0%, rgba(255,224,102,0.06) 100%)',
              border: '1px solid rgba(255,77,77,0.2)',
              borderRadius: '12px',
              padding: 'clamp(18px, 3vw, 28px)',
            }}>
              <div style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 800,
                fontSize: '0.9rem',
                marginBottom: '14px',
                color: 'var(--accent-yellow)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}>
                {/* Titre coloré : L'IA (blanc) aggrave (orange) tout en (blanc) 2026 (orange) */}
                <span style={{ color: '#fff' }}>L'IA </span>
                <span style={{ color: 'var(--accent-red)' }}>aggrave </span>
                <span style={{ color: '#fff' }}>tout en </span>
                <span style={{ color: 'var(--accent-red)' }}>2026</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[t('ia_1'), t('ia_2'), t('ia_3'), t('ia_4')].map((item, i) => (
                  <li key={i} style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    lineHeight: 1.5,
                    fontFamily: 'var(--font-body)',
                  }}>
                    <span style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: '1px' }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { number: t('card1_number'), title: t('card1_title'), desc: t('card1_desc') },
              { number: t('card2_number'), title: t('card2_title'), desc: t('card2_desc') },
              { number: t('card3_number'), title: t('card3_title'), desc: t('card3_desc') },
            ].map((card, i) => (
              <div
                key={i}
                className="anim-item"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: 'clamp(18px, 3vw, 28px)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s',
                  opacity: 0,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,77,77,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
              >
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: '3px', background: 'var(--accent-red)', borderRadius: '3px 0 0 3px',
                }} />
                <div style={{
                  fontFamily: 'var(--font-title)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                  color: 'var(--accent-red)',
                  lineHeight: 1,
                  marginBottom: '8px',
                  letterSpacing: '-0.03em',
                }}>
                  {card.number}
                </div>
                <h3 style={{ marginBottom: '8px', fontSize: 'clamp(0.9rem, 2vw, 1rem)', fontFamily: 'var(--font-title)' }}>
                  {card.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .problem-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 6vw, 80px);
        }
        @media (min-width: 900px) {
          .problem-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
