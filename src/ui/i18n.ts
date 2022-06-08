import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translation from '../_locales/en.json'

export const resources = {
  en: { translation }
} as const

i18n.use(initReactI18next).init({
  lng: 'en',
  resources
})

export default i18n
