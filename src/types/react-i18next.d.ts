import 'react-i18next'
import en from '../_locales/en.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      en: typeof en
    }
  }
}
