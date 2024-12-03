import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    set: (state, action) => {
      state.userData = action.payload;
    },
    clear: (state) => {
      state.userData = null;
    },
  },
});

export const { set, clear } = profileSlice.actions;
export default profileSlice.reducer;
