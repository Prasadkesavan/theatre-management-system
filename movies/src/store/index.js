import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { isloggedIn: false },
  reducers: {
    login(state) {
      state.isloggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("userId");
      state.isloggedIn = false; // Corrected: state.isloggedIn
    },
  },
});

const adminSlice = createSlice({
  name: "auth",
  initialState: { isloggedIn: false },
  reducers: {
    login(state) {
      state.isloggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
      state.isloggedIn = false; // Corrected: state.isloggedIn
    },
  },
});

export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export default store;
