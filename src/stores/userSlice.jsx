import { createSlice } from "@reduxjs/toolkit";
import * as userApi from '../apis/user-api'
const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,
    isHoverProfile: false,
    cartData: [],
    buyNow: {}, // อย่าลืมไปเพิ่มตอนกด buy now ให้ add product ใน cartData
    address: []
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
      let isHave = false;
      console.log(action.payload)
      state.cartData.map((item, idx) => {
        if (
          item.product_id === action.payload.product_id &&
          item.size === action.payload.size
        ) {
          isHave = true;
          state.cartData.splice(idx, 1);
          state.cartData.unshift(action.payload);
          // state.cartData[idx] = action.payload;
        }
      });
      if (!isHave) {
        state.cartData.unshift(action.payload);
      }
    },
    clickDeleteProductInCart: (state, action) => {
      state.cartData = state.cartData.filter(item=> item.id!=action.payload)
    },
    decreaseProductInCart: (state, action) => {
      state.cartData[action.payload].amount = +state.cartData[action.payload].amount-1
      state.cartData[action.payload].sumPrice = +state.cartData[action.payload].sumPrice-state.cartData[action.payload].price
    },
    increaseProductInCart: (state, action) => {
      state.cartData[action.payload].amount = +state.cartData[action.payload].amount+1
      state.cartData[action.payload].sumPrice = +state.cartData[action.payload].sumPrice+state.cartData[action.payload].price
    },
    setBuyNow: (state, action) => {
      console.log(action.payload);
      state.buyNow = action.payload;
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
  setBuyNow,
  clickDeleteProductInCart,
  decreaseProductInCart,
  increaseProductInCart
} = userSlice.actions;

export const handleHoverProfile = (status) => (dispatch) => {
  dispatch(setIsHoverProfile(status));
};

export const deleteProductFromCart = (cartId) => async(dispatch) => {
  try {
    const res = await userApi.deleteProductFromCart(cartId);
    if(res.status===201) {
      dispatch(clickDeleteProductInCart(cartId))
    }
  } catch (err) {
    alert('error ka')
    // console.log('error')
  }
}

export const clickIncreaseProductInCart = (idx, input) => async(dispatch) => {
  try {
    const res = await userApi.clickIncreaseProductInCart(input)
    dispatch(increaseProductInCart(idx))
  } catch(err) {
    console.log('error jaa')
  }
}
export const clickDecreaseProductInCart = (idx, input) => async(dispatch) => {
  try {
    const res = await userApi.clickDecreaseProductInCart(input)
    dispatch(decreaseProductInCart(idx))
  } catch(err) {
    console.log('error jaa')
  }
}