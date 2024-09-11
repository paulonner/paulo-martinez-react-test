import { useForm, FormProvider } from 'react-hook-form'
import InputForm from '../components/InputForm'
import { loginSchema } from '../validationSchemas'
import { useSignInMutation } from '../store/apis/loginApi'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

interface FormData {
  user: string;
  password: string;
  verifyPassword: string;
}

const Login = () => {
  const [ signIn, { error } ] = useSignInMutation()
  const navigate = useNavigate()
  const methods = useForm<FormData>({
    defaultValues: {
      user: '',
      password: '',
      verifyPassword: ''
    },
    mode: 'all',
    resolver: loginSchema
  })

  const onSubmit = async (data: FormData) => {
    const { data: response } = await signIn(data)
    if (response) return navigate('/products')
  }
  
  return (
    <section className="vh-lg-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center vh-100">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <div className="my-3 bg-white shadow-soft border rounded p-4 p-lg-5 w-100">
                <FormProvider {...methods}>
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h1 className="mb-0 h3">Iniciar sesión</h1>
                  </div>
                  <div className="text-danger text-center m-2">{error?.message}</div>
                  <form onSubmit={methods.handleSubmit(onSubmit)} className="d-flex flex-column">
                    <div className="mb-3">
                      <InputForm label="Usuario" name="user" />
                    </div>
                    <div className="mb-3">
                      <InputForm label="Contraseña" name="password" type="password" />
                    </div>
                    <div className="mb-3">
                      <InputForm label="Validar contraseña" name="verifyPassword" type="password"/>
                    </div>
                    <Button className="w-100">Iniciar sesión</Button>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login