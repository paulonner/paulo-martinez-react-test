import { useFormContext } from 'react-hook-form'
import { InputProps } from '../types'

const InputForm = ({ label, name, type = 'text' }: InputProps) => {
  const { register, formState: { touchedFields, errors } } = useFormContext()

  const isValid = errors[name]
    ? 'is-invalid'
    : !errors[name] && touchedFields[name] && 'is-valid'
  
  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        type={type}
        className={`form-control form-control-lg ${isValid}`}
        {...register(name)}
      />
      <div className="invalid-feedback">{errors[name]?.message as string}</div>
    </div>
  )
}

export default InputForm