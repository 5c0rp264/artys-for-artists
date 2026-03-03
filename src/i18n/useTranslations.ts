import { useCallback, useMemo } from 'react';

import { useI18n } from './useI18n';

export function useTranslations(namespace: string) {
  const { messages } = useI18n();
  const section = useMemo(() => messages[namespace] ?? {}, [messages, namespace]);

  return useCallback((key: string): string => section[key] ?? `${namespace}.${key}`, [section, namespace]);
}
