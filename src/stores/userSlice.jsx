import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,
    isHoverProfile: false,
  },
  reducers: {
    setUserProfile: (state, action) => {
      console.log(action.payload);
      state.userProfile = action.payload;
    },
    setIsHoverProfile: (state, action) => {
      state.isHoverProfile = action.payload;
    },
    userLogout: (state, action) => {
      state.userProfile = null;
      state.isHoverProfile = false;
    },
  },
});

export default userSlice.reducer;

export const { setUserProfile, setIsHoverProfile, userLogout } =
  userSlice.actions;


export const handleHoverProfile = (status) => dispatch => {
  dispatch(setIsHoverProfile(status))
}