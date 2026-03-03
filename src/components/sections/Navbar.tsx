import { useEffect, useRef, useState } from 'react';

import LangSwitcher from '@/components/ui/LangSwitcher';
import { useTranslations } from '@/i18n/useTranslations';

export default function Navbar() {
  const t = useTranslations('nav');
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isArtists, setIsArtists] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#backstage',  label: t('backstage') },
    { href: '#comparison', label: t('revenus') },
    { href: '#governance', label: t('gouvernance') },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleToggle = () => {
    const next = !isArtists;
    setIsArtists(next);
    setTimeout(() => {
      window.location.href = next
        ? 'https://artists.artysmusic.com'
        : 'https://artysmusic.com';
    }, 350);
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '0 clamp(16px, 4vw, 48px)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(0,0,0,0.97)' : 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'var(--border)'}`,
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ flexShrink: 0, display: 'flex', alignItems: 'center', lineHeight: 0 }}
          aria-label="Artys Music — accueil"
        >
          <img
            src="/artys-logo.png"
            alt="Artys Music"
            width={120}
            height={32}
            style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
          />
        </a>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(5px, 1.5vw, 10px)',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 'calc(100vw - 320px)',
          overflow: 'hidden',
        }}>
          <span style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 800,
            fontSize: 'clamp(0.52rem, 1.2vw, 0.78rem)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: !isArtists ? '#ffffff' : 'rgba(255,255,255,0.35)',
            transition: 'color 0.3s',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {t('toggle_fans')}
          </span>

          <button
            onClick={handleToggle}
            aria-label="Basculer entre version fans et artistes"
            style={{
              position: 'relative',
              width: '48px',
              height: '26px',
              borderRadius: '100px',
              background: '#fa5655',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
              transition: 'background 0.3s',
            }}
          >
            <span style={{
              position: 'absolute',
              top: '3px',
              left: isArtists ? '25px' : '3px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </button>

          <span style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 800,
            fontSize: 'clamp(0.52rem, 1.2vw, 0.78rem)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: isArtists ? '#ffffff' : 'rgba(255,255,255,0.35)',
            transition: 'color 0.3s',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {t('toggle_artists')}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LangSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              fontSize: '1.4rem',
              lineHeight: 1,
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px', left: 0, right: 0,
            zIndex: 999,
            background: 'rgba(0,0,0,0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            padding: '24px clamp(16px, 5vw, 32px) 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { e.preventDefault(); scrollTo(link.href); }}
              style={{
                color: 'var(--text)',
                textDecoration: 'none',
                fontFamily: 'var(--font-title)',
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '16px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta-section"
            onClick={e => { e.preventDefault(); scrollTo('#cta-section'); }}
            style={{
              marginTop: '20px',
              display: 'block',
              textAlign: 'center',
              background: 'var(--accent)',
              color: '#000',
              padding: '14px 24px',
              borderRadius: '8px',
              fontFamily: 'var(--font-title)',
              fontWeight: 900,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {t('rejoindre')}
          </a>
        </div>
      )}
    </>
  );
}
