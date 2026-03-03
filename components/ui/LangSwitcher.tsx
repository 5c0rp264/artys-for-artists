'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LOCALES = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

export default function LangSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  const getLocalePath = (targetLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    return segments.join('/') || '/';
  };

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((loc) => (
        <Link
          key={loc.code}
          href={getLocalePath(loc.code)}
          className={`
            px-2 py-1 rounded text-xs font-bold tracking-widest uppercase transition-all duration-200
            font-[var(--font-jost)]
            ${locale === loc.code
              ? 'text-[var(--accent)] bg-[rgba(0,229,176,0.1)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
            }
          `}
          style={{ fontFamily: 'var(--font-title)' }}
        >
          {loc.label}
        </Link>
      ))}
    </div>
  );
}
