import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE } from '../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'
import { useEffect, useState } from 'react'
import { availableLanguages } from '../services/translate'
import { useStore } from '../hooks/useStore'

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector = ({ onChange, value, type }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  const { languagesList, setLanguagesList } = useStore();
  
  useEffect(() => {
    availableLanguages()
    .then(lang => {
      setLanguagesList(lang)
    })
  }, [])

  return (
    <Form.Select name={`select-${type}-text`} aria-label="Select a language" onChange={handleChange} value={value}>
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detect Language</option>}
      {languagesList?.map(({ language, name }, index) => {
        const lang = type === SectionType.From 
          ? language.split("-")[0].trim()
          : language
        return (
          <option key={index} value={lang.toLocaleLowerCase()}>
            {name}
          </option>
        )
      })}
    </Form.Select>
  )
}