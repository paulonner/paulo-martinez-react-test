import React from 'react'

interface InputFilterProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label: string;
}

const InputFilter = ({ label, ...props }: InputFilterProps) => {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        type="text"
        className="form-control"
        {...props}
      />
    </div>
  )
}

export default InputFilter