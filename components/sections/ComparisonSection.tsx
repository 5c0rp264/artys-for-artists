'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ComparisonSection() {
  const t = useTranslations('comparison');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const rows = sectionRef.current?.querySelectorAll('tbody tr');
    rows?.forEach((row, i) => {
      gsap.fromTo(row,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
          delay: i * 0.05,
        }
      );
    });

    /* Mobile cards */
    const mobileCards = sectionRef.current?.querySelectorAll('.mobile-row-card');
    mobileCards?.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          delay: i * 0.04,
        }
      );
    });

    const callouts = sectionRef.current?.querySelectorAll('.callout-num');
    callouts?.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const isMillions = el.getAttribute('data-suffix') === 'M';
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el, start: 'top 85%', once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target, duration: 2, ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${Math.round(obj.val).toLocaleString('fr-FR')}${isMillions ? ' M' : ''}`;
            }
          });
        }
      });
    });

    const cards = sectionRef.current?.querySelectorAll('.callout-card-anim');
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        }
      );
    });
  }, { scope: sectionRef });

  /* Données de la table */
  const rows = [
    {
      metric: t('row1_metric'),
      streaming: <span className="val-big red">0,10–0,30 $</span>,
      hybrid: <span className="val-big yellow">~3 $</span>,
      artys: <span className="val-big green">6 $</span>,
    },
    {
      metric: t('row2_metric'),
      streaming: '10–30 $/mois',
      hybrid: '~300 $/mois',
      artys: <span style={{ color: 'var(--accent)', fontWeight: 700 }}>600 $/mois</span>,
    },
    {
      metric: t('row3_metric'),
      streaming: '50–150 $/mois',
      hybrid: '~1 500 $/mois',
      artys: <span style={{ color: 'var(--accent)', fontWeight: 700 }}>3 000 $/mois</span>,
    },
    {
      metric: t('row4_metric'),
      streaming: '100–300 $/mois',
      hybrid: '~3 000 $/mois',
      artys: <span style={{ color: 'var(--accent)', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'var(--font-title)' }}>6 000 $/mois</span>,
    },
    {
      metric: t('row5_metric'),
      streaming: '—',
      hybrid: '≈ 1 000 streams/fan/mois',
      artys: '≈ 2 000 streams/fan/mois',
    },
    {
      metric: t('row6_metric'),
      streaming: <span style={{ color: 'var(--accent-red)' }}>❌ Algorithmique</span>,
      hybrid: '✅ Mensuelle',
      artys: '✅ Mensuelle garantie',
    },
    {
      metric: t('row7_metric'),
      streaming: <span style={{ color: 'var(--accent-red)' }}>Oui, totalement</span>,
      hybrid: 'Partiellement',
      artys: <span style={{ color: 'var(--accent)' }}>Non, jamais</span>,
    },
    {
      metric: t('row8_metric'),
      streaming: 'Indirecte',
      hybrid: 'Directe',
      artys: 'Directe + exclusive',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="comparison"
      style={{ padding: 'clamp(80px, 10vh, 140px) 0', overflow: 'hidden', position: 'relative' }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto clamp(40px, 6vh, 72px)' }}>
          <div className="tag">{t('tag')}</div>
          <h2 style={{ marginBottom: '16px' }}>
            {t('title')}{' '}
            <span className="highlight">{t('title_highlight')}</span>
            {t('title_end')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', fontFamily: 'var(--font-body)' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* ── TABLE — desktop only (≥ 768px) ── */}
        <div className="table-desktop" style={{ overflowX: 'auto' }}>
          <table className="comparison-table">
            <thead>
              <tr>
                <th style={{ width: '220px' }}>Métrique</th>
                <th>{t('col_streaming')}</th>
                <th>
                  {t('col_hybrid')}<br />
                  <span style={{ fontWeight: 400, fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {t('col_hybrid_sub')}
                  </span>
                </th>
                <th className="col-featured">
                  {t('col_royaltips')}
                  <span className="badge-best">{t('badge_recommended')}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td className="metric-col">{row.metric}</td>
                  <td>{row.streaming}</td>
                  <td>{row.hybrid}</td>
                  <td className="col-featured">{row.artys}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── CARDS — mobile only (< 768px) ── */}
        <div className="table-mobile">
          {/* Artys card en haut, destacada */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,229,176,0.1) 0%, rgba(0,229,176,0.03) 100%)',
            border: '1px solid var(--accent-border)',
            borderRadius: '14px',
            overflow: 'hidden',
            marginBottom: '20px',
          }}>
            <div style={{
              background: 'rgba(0,229,176,0.12)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 900,
                fontSize: '0.9rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}>
                {t('col_royaltips')}
              </span>
              <span className="badge-best">{t('badge_recommended')}</span>
            </div>
            {rows.map((row, i) => (
              <div key={i} className="mobile-row-card" style={{
                padding: '14px 20px',
                borderTop: i > 0 ? '1px solid rgba(0,229,176,0.1)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                opacity: 0,
              }}>
                <span style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-title)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                  maxWidth: '45%',
                }}>
                  {row.metric}
                </span>
                <span style={{
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  textAlign: 'right',
                }}>
                  {row.artys}
                </span>
              </div>
            ))}
          </div>

          {/* Comparaison streaming classique */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            overflow: 'hidden',
            marginBottom: '12px',
          }}>
            <div style={{
              background: 'rgba(255,77,77,0.08)',
              padding: '14px 20px',
            }}>
              <span style={{
                fontFamily: 'var(--font-title)',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
              }}>
                {t('col_streaming')}
              </span>
            </div>
            {rows.map((row, i) => (
              <div key={i} style={{
                padding: '12px 20px',
                borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-title)', fontWeight: 700, textTransform: 'uppercase', maxWidth: '45%' }}>
                  {row.metric}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
                  {row.streaming}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Callout Cards */}
        <div className="callout-grid">
          {[
            { number: '25', suffix: 'M', target: 25, color: 'var(--accent-red)', label: t('callout1_label'), sub: t('callout1_sub'), featured: false },
            { number: '333', suffix: '', target: 333, color: 'var(--accent)', label: t('callout2_label'), sub: t('callout2_sub'), featured: true },
            { number: '1 000', suffix: '', target: 1000, color: 'var(--accent-yellow)', label: t('callout3_label'), sub: t('callout3_sub'), featured: false },
          ].map((card, i) => (
            <div
              key={i}
              className="callout-card-anim"
              style={{
                background: card.featured
                  ? 'linear-gradient(135deg, rgba(0,229,176,0.08) 0%, rgba(0,229,176,0.02) 100%)'
                  : 'var(--surface)',
                border: `1px solid ${card.featured ? 'var(--accent-border)' : 'var(--border)'}`,
                borderRadius: '14px',
                padding: 'clamp(22px, 4vw, 32px) clamp(18px, 3vw, 28px)',
                textAlign: 'center',
                opacity: 0,
                transition: 'transform 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <div
                className="callout-num"
                data-target={card.target}
                data-suffix={card.suffix}
                style={{
                  fontFamily: 'var(--font-title)',
                  fontWeight: 900,
                  fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  marginBottom: '8px',
                  color: card.color,
                }}
              >
                {card.number}{card.suffix ? ' ' + card.suffix : ''}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontFamily: 'var(--font-body)', whiteSpace: 'pre-line' }}>
                {card.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
                {card.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .table-desktop { display: none; }
        .table-mobile  { display: block; }
        .callout-grid {
          margin-top: clamp(36px, 5vh, 56px);
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .callout-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 768px) {
          .table-desktop { display: block; }
          .table-mobile  { display: none; }
        }
      `}</style>
    </section>
  );
}
