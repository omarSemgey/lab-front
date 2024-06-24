import { createSlice } from '@reduxjs/toolkit'

const initialState = {
value: 0,
}

export const roleSlice = createSlice({
name: 'role',
initialState,
reducers: {
    setRole: (state, action) => {
      state.value = action.payload
      },
    logout: (state) => {
      state.value = 0
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRole,logout } = roleSlice.actions

export default roleSlice.reducer