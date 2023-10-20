import { createSlice } from "@reduxjs/toolkit";

const initialInputRegister = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  password: "",
};

const initialInputLogin = {
  email: "",
  password: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: {
    registerInput: initialInputRegister,
    registerError: initialInputRegister,
    loginInput: initialInputLogin,
    loginError: "",
    loginOrRegister: true,
    showPassword: { login: false, register: false }, //idx1=login,idx2=register
  },
  reducers: {
    setRegisterError: (state, action) => {
      state.registerError = action.payload;
    },
    resetRegisterLoginInput: (state, action) => {
      state.registerError = initialInputRegister;
      state.registerInput = initialInputRegister;
      state.loginOrRegister = true;
      state.showPassword = { login: false, register: false };
      state.loginError = "";
      state.loginInput = initialInputLogin;
    },
    setLoginOrRegister: (state, action) => {
      state.loginOrRegister = !state.loginOrRegister;
    },
    setLogin: (state, action) => {
      state.loginOrRegister = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword[action.payload] = !state.showPassword[action.payload];
    },
    setRegisterInput: (state, action) => {
      state.registerInput = { ...state.registerInput, ...action.payload };
    },
    setLoginInput: (state, action) => {
      state.loginInput = { ...state.loginInput, ...action.payload };
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
  },
});
export default authSlice.reducer;

export const {
  setLoginOrRegister,
  resetRegisterLoginInput,
  setShowPassword,
  setRegisterInput,
  setRegisterError,
  setLogin,
  setLoginInput,
  setLoginError,
} = authSlice.actions;
