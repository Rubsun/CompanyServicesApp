import { createSlice } from '@reduxjs/toolkit'

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    value: []
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    clear: state => {
      state.news = []
    },
  }
})

export const { set, clear } = newsSlice.actions

export default newsSlice.reducer