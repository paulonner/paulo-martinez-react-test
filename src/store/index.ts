import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import { api } from './apis'

export const store = configureStore({
  reducer: {
    app: appReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch