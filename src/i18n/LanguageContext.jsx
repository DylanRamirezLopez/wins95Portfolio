import React, { createContext, useState, useContext, useCallback } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  const t = useCallback((key, params = {}) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    if (typeof value === 'string') {
      return value.replace(/\{(\w+)\}/g, (_, p) => params[p] ?? `{${p}}`);
    }
    return value ?? key;
  }, [lang]);

  const switchLang = useCallback((newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return { lang: 'en', t: (k) => k, switchLang: () => {} };
  }
  return ctx;
}

export default LanguageContext;
