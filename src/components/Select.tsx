import { useFormContext } from 'react-hook-form'
import { InputProps } from '../types'

const Select = ({ label, name }: InputProps) => {
  const { register, formState: { errors, touchedFields } } = useFormContext()

  const isValid = errors[name]
    ? 'is-invalid'
    : !errors[name] && touchedFields[name] && 'is-valid'

  return (
    <div>
      <label className="form-label">{label}</label>
      <select className={`form-select ${isValid}`} {...register(name)}>
        <option selected>Seleccionar categoría</option>
        <option value="electronics">electronics</option>
        <option value="men's clothing">men's clothing</option>
        <option value="women's clothing">women's clothing</option>
      </select>
      <div className="invalid-feedback">{errors[name]?.message as string}</div>
    </div>
  )
}

export default Select