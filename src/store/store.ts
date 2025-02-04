import { configureStore } from '@reduxjs/toolkit'

import chartReducer from '../features/chartSlice'
import cryptoReducer from '../features/cryptoSlice'

export const store = configureStore({
  reducer: { crypto: cryptoReducer, chart: chartReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
