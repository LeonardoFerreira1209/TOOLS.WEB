import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Welcome": "Welcome to React and react-i18next",
          // Mais chaves de tradução para "en" aqui...
        }
      },
      pt: {
        translation: {
          "Welcome": "Bem-vindo ao React e react-i18next",
          // Mais chaves de tradução para "pt" aqui...
        }
      }
      // Adicione outras linguagens conforme necessário...
    },
    lng: "en", // linguagem padrão
    fallbackLng: "en", // caso uma chave não seja encontrada nesta língua, volte para esta língua
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;