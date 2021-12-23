import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// import i18nextHttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from 'moment';

import { APP_EN } from './en/app';
import { APP_RU } from './ru/app';

i18next
  .use(LanguageDetector)
  .use(initReactI18next) // Добавление плагина react-i18next
  .init({
    fallbackNS: '',
    fallbackLng: 'ru', // Язык, применяемый, если значение применён отсутсвующий язык
    interpolation: {
      format: (value, format) => {
        if (value) {
          return moment(value).format(format);
        }
        return value;
      },
    },
    resources: {
      // Установка локализации
      en: {
        // Язык
        translation: APP_EN, // Локализация
      },
      ru: {
        translation: APP_RU,
      },
    },
  });
moment.locale(i18next.language);
