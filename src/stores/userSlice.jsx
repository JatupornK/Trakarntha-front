import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,
    isHoverProfile: false,
    cartData: [],
  },
  reducers: {
    setUserProfile: (state, action) => {
      // console.log(action.payload);
      state.userProfile = action.payload;
    },
    setIsHoverProfile: (state, action) => {
      state.isHoverProfile = action.payload;
    },
    userLogout: (state, action) => {
      state.userProfile = null;
      state.isHoverProfile = false;
    },
    fetchCartData: (state, action) => {
      state.cartData = [...action.payload];
    },
    resetCartData: (state, action) => {
      state.cartData = [];
    },
    updateCartData: (state, action) => {
      console.log(action.payload);
      state.cartData.unshift(action.payload);
    },
  },
});

export default userSlice.reducer;

export const {
  setUserProfile,
  setIsHoverProfile,
  userLogout,
  fetchCartData,
  resetCartData,
  updateCartData,
} = userSlice.actions;

export const handleHoverProfile = (status) => (dispatch) => {
  dispatch(setIsHoverProfile(status));
};
