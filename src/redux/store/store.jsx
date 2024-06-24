import { configureStore } from '@reduxjs/toolkit'
import roleReducer from '../reducers/roleSlice'

export const store = configureStore({
    reducer: {
        role: roleReducer,
    },})