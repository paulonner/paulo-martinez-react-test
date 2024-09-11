import { api } from '.'
import { saveSession, removeSession } from '../../utils'

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      queryFn: async (data, { getState }) => {
        return new Promise((resolve, reject) => {
          const { app: { email, password } } = getState()

          if (data.user === email && data.password === password) {
            saveSession({ email: data.user })
            return resolve({ data: true })
          }

          return reject('Usuario/Contraseña invalido')
        })
      }
    }),
    signOut: builder.mutation({
      queryFn: async () => {
        return new Promise(resolve => {
          removeSession()
          return resolve({ data: true })
        })
      }
    })
  })
})

export const { useSignInMutation } = loginApi