import { type ReactNode, useCallback,useState } from 'react';

import en from '../messages/en.json';
import es from '../messages/es.json';
import fr from '../messages/fr.json';
import { type Locale, LOCALES } from './constants';
import { I18nContext, type I18nContextValue } from './useI18n';

type Messages = I18nContextValue['messages'];

const messagesByLocale: Record<Locale, Messages> = { fr, en, es };

function detectLocale(): Locale {
  const stored = localStorage.getItem('artys-locale') as Locale | null;
  if (stored && LOCALES.includes(stored)) return stored;

  const browserLang = navigator.language.split('-')[0] as Locale;
  if (LOCALES.includes(browserLang)) return browserLang;

  return 'fr';
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('artys-locale', l);
    document.documentElement.lang = l;
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, messages: messagesByLocale[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}
