import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Charge les fichiers en fonction de la langue et du namespace
    },
    lng: 'en', // Langue par défaut
    fallbackLng: 'en', // Langue de repli
    ns: ['about', "adventure", "avis", "contact", "dayTripsList", "discover", 'footer', "home", "nav","popup", "tours_lists", "tours", "why"], // Ajoutez tous vos namespaces ici
    defaultNS: 'nav', // Namespace par défaut (celui utilisé si vous ne spécifiez pas de namespace)
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;