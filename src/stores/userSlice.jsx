import { createSlice } from "@reduxjs/toolkit";
import * as userApi from "../apis/user-api";
import { generateCurrentTime } from "../utills/getCurrentTime";

const initialInputCreateAddress = {
  addressTitle: "",
  firstName: "",
  lastName: "",
  address: "",
  postCode: "",
  phoneNumber: "",
};
const initialDefaultPayment = {
  last4: '',
  brand: ''
}
const userSlice = createSlice({
  name: "user",
  initialState: {
    userProfile: null,
    isHoverProfile: false,
    cartData: [],
    buyNow: {}, // อย่าลืมไปเพิ่มตอนกด buy now ให้ add product ใน cartData
    inputCreateAddress: initialInputCreateAddress,
    errorCreateAddress: initialInputCreateAddress,
    newSelectedAddressId: {id:''},
    defaultPayment: initialDefaultPayment
  },
  reducers: {
    setUserProfile: (state, action) => {
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
      console.log(action.payload);
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
      state.cartData = state.cartData.filter(
        (item) => item.id != action.payload
      );
    },
    decreaseProductInCart: (state, action) => {
      state.cartData[action.payload].amount =
        +state.cartData[action.payload].amount - 1;
      state.cartData[action.payload].sumPrice =
        +state.cartData[action.payload].sumPrice -
        state.cartData[action.payload].price;
    },
    increaseProductInCart: (state, action) => {
      state.cartData[action.payload].amount =
        +state.cartData[action.payload].amount + 1;
      state.cartData[action.payload].sumPrice =
        +state.cartData[action.payload].sumPrice +
        state.cartData[action.payload].price;
    },
    setBuyNow: (state, action) => {
      // console.log(action.payload);
      state.buyNow = action.payload;
    },
    setInputCreateAddress: (state, action) => {
      // console.log(action.payload);
      state.inputCreateAddress = {
        ...state.inputCreateAddress,
        ...action.payload,
      };
    },
    setErrorCreateAddress: (state, action) => {
      console.log(action.payload);
      state.errorCreateAddress = action.payload;
    },
    resetInputErrorCreateAddress: (state, action) => {
      state.errorCreateAddress = initialInputCreateAddress;
      state.inputCreateAddress = initialInputCreateAddress;
    },
    createNewAddress: (state,action) => {
      if(state.userProfile.Addresses.length>0){
        state.userProfile.Addresses.map((item,idx)=>{
          if(item.lastest) {
            state.userProfile.Addresses[idx].lastest=false
          }
        })
        state.userProfile.Addresses.unshift(action.payload)
      }else {
        console.log(action.payload)
        state.userProfile.Addresses = [action.payload]
      }
    },
    updateSelectedAddress: (state, action) => {
      // console.log(action.payload)
      let idx = state.userProfile.Addresses.findIndex(item=>item.lastest===true)
      console.log(generateCurrentTime())
      console.log(state.userProfile.Addresses[idx].updatedAt)
      state.userProfile.Addresses[idx].updatedAt = generateCurrentTime()
      console.log(state.userProfile.Addresses[idx].updatedAt)
      state.userProfile.Addresses[idx].lastest=false;
      idx = state.userProfile.Addresses.findIndex(item=>item.id===action.payload.id)
      // console.log('idx2',idx)
      state.userProfile.Addresses[idx].lastest=true
    },
    selectNewAddress: (state, action) => {
      state.newSelectedAddressId = {...action.payload}
    },
    setDefaultPayment: (state, action) => {
      console.log(action.payload)
      state.defaultPayment = {...state.defaultPayment,...action.payload}
    }
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
  increaseProductInCart,
  setInputCreateAddress,
  setErrorCreateAddress,
  resetInputErrorCreateAddress,
  createNewAddress,
  selectNewAddress,
  updateSelectedAddress,
  setDefaultPayment
} = userSlice.actions;

export const handleHoverProfile = (status) => (dispatch) => {
  dispatch(setIsHoverProfile(status));
};

export const deleteProductFromCart = (cartId) => async (dispatch) => {
  try {
    const res = await userApi.deleteProductFromCart(cartId);
    if (res.status === 201) {
      dispatch(clickDeleteProductInCart(cartId));
    }
  } catch (err) {
    alert("error ka");
    // console.log('error')
  }
};

export const clickIncreaseProductInCart = (idx, input) => async (dispatch) => {
  try {
    const res = await userApi.clickIncreaseProductInCart(input);
    dispatch(increaseProductInCart(idx));
  } catch (err) {
    console.log("error jaa");
  }
};
export const clickDecreaseProductInCart = (idx, input) => async (dispatch) => {
  try {
    const res = await userApi.clickDecreaseProductInCart(input);
    dispatch(decreaseProductInCart(idx));
  } catch (err) {
    console.log("error jaa");
  }
};
