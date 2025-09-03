import { useReducer } from "react"
import type { Action, FromLanguage, Language, State } from "../types"
import { AUTO_LANGUAGE } from "../constants"

const initialState: State = {
  languagesList: [{language: 'en-US', name: 'English'}, {language: 'es', name: 'Spanish'}],
  fromLanguage: 'auto',
  toLanguage: 'ar',
  fromText: '',
  result: '',
  loading: false
}

export function reducer (state: State, action: Action) {
  const { type } = action

  if (type === 'SET_LANGUAGES_LIST') {
    return {
      ...state,
      languagesList: action.payload
    }
  }

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      result: state.fromText,
      fromText: state.result,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state
    
    const loading = state.fromText !== ''
    
    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state

    const loading = state.fromText !== ''
    
    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

export function useStore () {
  const [{
    languagesList,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const setLanguagesList = (payload: []) => {
    dispatch({type: 'SET_LANGUAGES_LIST', payload})
  }

  const interChangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    setLanguagesList,
    languagesList,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interChangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
