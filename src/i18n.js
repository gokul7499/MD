// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import mr from './locales/mr.json';

// Initialize i18next
i18n
  .use(initReactI18next) // Pass the instance to react-i18next
  .init({
    resources: {
      en: { translation: en },  // English translations
      mr: { translation: mr },  // Marathi translations
    },
    lng: 'en',  // Default language
    fallbackLng: 'en',  // Fallback language if the key is not found
    interpolation: { escapeValue: false }, // Don't escape values in translation
  });

export default i18n;
