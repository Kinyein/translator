import type { AUTO_LANGUAGE, SUPPORTED_LANGUAGES, VOICE_FOR_LANGUAGE } from "./constants"

export type LanguageInfo = {language: string, name: string} 
export type Language = string
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage
export type LanguageCode = keyof typeof VOICE_FOR_LANGUAGE;

export interface State {
  languagesList: LanguageInfo[]
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action = 
  | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_TO_LANGUAGE', payload: Language }
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }
  | { type: 'SET_LANGUAGES_LIST', payload: [] }

export enum SectionType { // Como un diccionario
  From = 'from',
  To = 'to'
}

export type TranslateParams = {
  fromText: string
  fromLanguage: FromLanguage
  toLanguage: Language
}