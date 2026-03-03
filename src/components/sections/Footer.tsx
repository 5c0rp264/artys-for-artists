import { useTranslations } from '@/i18n/useTranslations';

export default function Footer() {
  const t = useTranslations('footer');

  const cols = [
    {
      title: t('col1_title'),
      links: [t('col1_link1'), t('col1_link2'), t('col1_link3'), t('col1_link4')],
    },
    {
      title: t('col2_title'),
      links: [t('col2_link1'), t('col2_link2'), t('col2_link3'), t('col2_link4')],
    },
    {
      title: t('col3_title'),
      links: [t('col3_link1'), t('col3_link2'), t('col3_link3'), t('col3_link4')],
    },
  ];

  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: 'clamp(40px, 7vh, 60px) 0 clamp(28px, 4vh, 40px)' }}>
      <div className="container">
        <div className="footer-grid">
          <style>{`
            .footer-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 36px 24px;
              margin-bottom: clamp(36px, 5vh, 60px);
            }
            .footer-brand { grid-column: 1 / -1; }
            @media (min-width: 640px) {
              .footer-grid { grid-template-columns: 1fr 1fr 1fr; gap: 40px 32px; }
              .footer-brand { grid-column: 1 / -1; }
            }
            @media (min-width: 900px) {
              .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; }
              .footer-brand { grid-column: auto; }
            }
          `}</style>
          <div className="footer-brand">
            <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '16px', lineHeight: 0 }}
              aria-label="Artys Music — accueil"
            >
              <img
                src="/artys-logo.png"
                alt="Artys Music"
                width={140}
                height={37}
                style={{ height: '37px', width: 'auto', objectFit: 'contain' }}
              />
            </a>
            <p style={{
              fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65,
              maxWidth: '280px', marginBottom: '24px', fontFamily: 'var(--font-body)',
            }}>
              {t('tagline')}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['𝕏', 'in', '▶', '📸'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,176,0.3)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col, i) => (
            <div key={i}>
              <h5 style={{
                fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: '0.75rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--text-secondary)', marginBottom: '20px',
              }}>
                {col.title}
              </h5>
              <ul style={{ listStyle: 'none' }}>
                {col.links.map((link, j) => (
                  <li key={j} style={{ marginBottom: '12px' }}>
                    <a
                      href="#"
                      style={{
                        color: 'var(--text-secondary)', textDecoration: 'none',
                        fontSize: '0.875rem', fontFamily: 'var(--font-body)', transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: '28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            {t('copyright')}
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[t('terms'), t('privacy'), t('legal')].map((link, i) => (
              <a
                key={i}
                href="#"
                style={{
                  fontSize: '0.78rem', color: 'var(--text-dim)', textDecoration: 'none',
                  fontFamily: 'var(--font-mono)', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
