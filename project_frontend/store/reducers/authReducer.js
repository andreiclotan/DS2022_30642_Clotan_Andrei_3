import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userType: null,
  userId: null,
  chatId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      console.log(action.payload);
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.id,
        userType: action.payload.role,
        chatId: null,
      };
    },
    logOut(state) {
      return {
        ...state,
        isLoggedIn: false,
        userType: null,
        userId: null,
        chatId: null,
      };
    },
    setChatId(state, action) {
      return {
        ...state,
        chatId: action.payload,
      };
    },
  },
});

export const { logIn, logOut, setChatId } = authSlice.actions;

export default authSlice.reducer;
