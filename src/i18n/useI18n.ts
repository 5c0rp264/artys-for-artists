import { createContext, useContext } from 'react';

import { type Locale } from './constants';

type Messages = Record<string, Record<string, string>>;

export interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  messages: Messages;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
