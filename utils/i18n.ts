import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from '../public/locales/ru.json';

// Add more languages here as needed
const resources = {
  ru: { translation: ru },
  // en: { translation: en },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  });

export default i18n; 