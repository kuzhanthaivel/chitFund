import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './authenticationSlice'
import popUpSlice from './popUpSlice'

export const store = configureStore({
  reducer: {
    auth: authenticationSlice,
    popUp: popUpSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch