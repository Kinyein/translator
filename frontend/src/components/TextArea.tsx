import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

type Props = {
  type: SectionType
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyles = { border: 0, height: '200px', resize: 'none'}

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean}) => {
  if (type === SectionType.From) return 'Write text'
  if (loading) return 'Translating...'
  return 'Translation'
}

export const TextArea = ({ loading, type, value, onChange }: Props) => {
  const styles = type === SectionType.From
    ? commonStyles
    : {...commonStyles, backgroundColor: '#f5f5f5'}

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

    
  return (
    <Form.Control
      name={`select-${type}-text`}
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
}