import { useFormContext } from 'react-hook-form'
import { InputProps } from '../types'

const InputFile = ({ label, name }: InputProps) => {
  const { setValue, formState: { errors, touchedFields } } = useFormContext()

  const handleFile = ({ files }) => {
    const [ file ] = files
    const url = URL.createObjectURL(file)
    setValue(name, url, { shouldTouch: true })
  }

  const isValid = errors[name]
    ? 'is-invalid'
    : !errors[name] && touchedFields[name] && 'is-valid'

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        className={`form-select ${isValid}`}
        type="file" onChange={e => handleFile(e.target)}
      />
      <div className="invalid-feedback">{errors[name]?.message as string}</div>
    </div>
  )
}

export default InputFile