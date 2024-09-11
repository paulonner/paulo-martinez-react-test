import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const REQUIRE_FIEL = 'Este campo es requerido'
const REQUIRE_NUMBER = 'Ingrese solo números'

export const productSchema = yupResolver(yup.object().shape({
  title: yup.string().required(REQUIRE_FIEL),
  price: yup.number().typeError(REQUIRE_NUMBER).required(REQUIRE_FIEL),
  description: yup.string().required(REQUIRE_FIEL),
  image: yup.string().required(REQUIRE_FIEL),
  category: yup.string().required(REQUIRE_FIEL)
}))