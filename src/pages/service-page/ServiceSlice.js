import { createSlice } from '@reduxjs/toolkit'

export const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    value: []
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    clear: state => {
      state.value = []
    },
  }
})

export const { set, clear } = servicesSlice.actions

export default servicesSlice.reducer