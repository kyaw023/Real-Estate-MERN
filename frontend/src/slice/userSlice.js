import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  isError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },

    setLoginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.isError = null;
    },

    setLogoutSuccess: (state) => {
      state.currentUser = null;
      state.isLoading = false;
      state.isError = null;
    },

    setError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },

    setUpdateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.isError = null;
    },
  },
});

export const {
  setLoading,
  setLoginSuccess,
  setLogoutSuccess,
  setError,
  setUpdateSuccess,
} = userSlice.actions;
export default userSlice.reducer;
