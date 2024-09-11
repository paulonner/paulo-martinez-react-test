import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  isAuthenticated: boolean;
  email: string;
  password: string;
}

const initialState: AppState = {
  isAuthenticated: true,
  email: 'paulo@correo.com',
  password: 'Master10_'
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleAuthentication: (state) => {
      state.isAuthenticated = !state.isAuthenticated
    }
  }
})

export const { toggleAuthentication } = appSlice.actions
export default appSlice.reducer