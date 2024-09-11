import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const loginSchema = yupResolver(yup.object().shape({
  user: yup.string()
    .email('Ingrese formato de correo valido')
    .required('Ingrese un correo'),
  password: yup.string()
    .required('Ingrese una contraseña')
    .min(6, 'Ingrese un mínimo 6 caracteres')
    .max(12, 'Ingrese un máximo 12 caracteres')
    .matches(/^(?=.*[A-Z])/, 'Tu contraseña debe contener al menos una letra mayúscula')
    .matches(/^(?=.*[a-z])/, 'Tu contraseña debe contener al menos una letra minúscula')
    .matches(/^(?=.*[!@#$%^&*()_+\-=[\]{}':"\\|,.<>/?])/, 'Tu contraseña debe contener al menos un carácter')
    .matches(/^(?=.*[0-9])/, 'Tu contraseña debe contener al menos un número'),
  verifyPassword: yup.string()
    .required('Confirme la contraseña')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
}))