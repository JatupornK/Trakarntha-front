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
  last4: "",
  brand: "",
  updatedAt: "",
  id: "",
  lastest: '',
  // userPaymentId:
};
const initialError = {
  address: '',
  payment: '',
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
    newSelectedAddressId: { id: "" },
    defaultPayment: initialDefaultPayment,
    userAllPaymentMethods: [],
    newSelectedPaymentId: { id: "" },
    orderSuccess: false,
    haveAddressPayment: initialError
  },
  reducers: {
    setUserProfile: (state, action) => {
      console.log(action.payload)
      state.userProfile = action.payload;
    },
    setIsHoverProfile: (state, action) => {
      state.isHoverProfile = action.payload;
    },
    userLogout: (state, action) => {
      state.userProfile= null,
    state.isHoverProfile= false,
    state.cartData= [],
    state.buyNow= {}, // อย่าลืมไปเพิ่มตอนกด buy now ให้ add product ใน cartData
    state.inputCreateAddress= initialInputCreateAddress,
    state.errorCreateAddress= initialInputCreateAddress,
    state.newSelectedAddressId= { id: "" },
    state.defaultPayment= initialDefaultPayment,
    state.userAllPaymentMethods= [],
    state.newSelectedPaymentId= { id: "" },
    state.orderSuccess= false,
    state.haveAddressPayment= initialError
    },
    fetchCartData: (state, action) => {
      console.log(action.payload)
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
    createNewAddress: (state, action) => {
      if (state.userProfile.Addresses.length > 0) {
        state.userProfile.Addresses.map((item, idx) => {
          if (item.lastest) {
            state.userProfile.Addresses[idx].lastest = false;
          }
        });
        state.userProfile.Addresses.unshift(action.payload);
      } else {
        console.log(action.payload);
        state.userProfile.Addresses = [action.payload];
      }
    },
    updateSelectedAddress: (state, action) => {
      // console.log(action.payload)
      let idx = state.userProfile.Addresses.findIndex(
        (item) => item.lastest === true
      );
      console.log(generateCurrentTime());
      // console.log(state.userProfile.Addresses[idx].updatedAt);
      state.userProfile.Addresses[idx].updatedAt = generateCurrentTime();
      // console.log(state.userProfile.Addresses[idx].updatedAt);
      state.userProfile.Addresses[idx].lastest = false;
      idx = state.userProfile.Addresses.findIndex(
        (item) => item.id === action.payload.id
      );
      // console.log('idx2',idx)
      state.userProfile.Addresses[idx].lastest = true;
    },
    selectNewAddress: (state, action) => {
      console.log(action.payload)
      state.newSelectedAddressId = { ...action.payload };
    },
    setDefaultPayment: (state, action) => {
      console.log(action.payload);
      state.defaultPayment = { ...state.defaultPayment, ...action.payload };
    },
    setAllUserPaymentMethods: (state, action) => {
      console.log(action.payload);
      state.userAllPaymentMethods = action.payload;
    },
    setNewStripeCustomer: (state, action) => {
      console.log(action.payload);
      state.userProfile.stripeCustomerId = action.payload;
    },
    addNewPayment: (state, action) => {
      console.log(action.payload);
      state.userAllPaymentMethods.unshift(action.payload);
    },
    selectNewDefaultPayment: (state, action) => {
      console.log(action.payload);
      state.newSelectedPaymentId = { ...action.payload };
    },
    updateSelectedPayment: (state, action) => {
      console.log(action.payload);
      let idx = state.userAllPaymentMethods.findIndex(
        (item) => item.id === state.defaultPayment.id
      );
      state.userAllPaymentMethods[idx].updatedAt = generateCurrentTime();
      idx = state.userAllPaymentMethods.findIndex(
        (item) => item.id === action.payload.id
      );
      state.defaultPayment = state.userAllPaymentMethods[idx];
    },
    UpdatePaymentsTime: (state, action) => {
      console.log(action.payload);
      const index = action.payload.findIndex(item=>item.stripePaymentId===state.defaultPayment.id)
      console.log(index)
      state.defaultPayment.updatedAt = action.payload[index].updatedAt
      state.userAllPaymentMethods = state.userAllPaymentMethods.map((item1) => {
        for (let item of action.payload) {
          if (item1.id === item.stripePaymentId) {
            return { ...item1, updatedAt: item.updatedAt, lastest: item.lastest };
          }
        }
      });
    },
    setOrderSuccess: (state, action) => {
      state.orderSuccess = action.payload
    },
    setError: (state, action) => {
      console.log(action.payload)
      state.haveAddressPayment = {...state.haveAddressPayment,...action.payload}
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
  setDefaultPayment,
  setAllUserPaymentMethods,
  setNewStripeCustomer,
  addNewPayment,
  selectNewDefaultPayment,
  updateSelectedPayment,
  UpdatePaymentsTime,
  setOrderSuccess,
  setError
} = userSlice.actions;

export const handleHoverProfile = (status) => (dispatch) => {
  dispatch(setIsHoverProfile(status));
};

export const deleteProductFromCart = (cartId) => async (dispatch) => {
  try {
    const res = await userApi.deleteProductFromCart({cartId});
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
