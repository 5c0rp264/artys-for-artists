import { type Locale, LOCALES } from '@/i18n/constants';
import { useI18n } from '@/i18n/useI18n';

const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
  es: 'ES',
};

export default function LangSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((code) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          className={`
            px-2 py-1 rounded text-xs font-bold tracking-widest uppercase transition-all duration-200
            ${locale === code
              ? 'text-[var(--accent)] bg-[rgba(0,229,176,0.1)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
            }
          `}
          style={{ fontFamily: 'var(--font-title)', border: 'none', cursor: 'pointer' }}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
