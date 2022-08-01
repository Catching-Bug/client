import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from '../module/rootReducer'

const makeStore = (context: any) =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== 'production',
  })

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
})
