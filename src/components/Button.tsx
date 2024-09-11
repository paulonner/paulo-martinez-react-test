interface ButtonProps {
  children: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, type = 'submit', className, onClick }: ButtonProps) => {
  return (
    <button type={type} className={`btn btn-primary btn-md ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button