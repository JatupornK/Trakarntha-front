import { createSlice } from "@reduxjs/toolkit";
import { STATUS_COMPLETE, STATUS_DELIVERY, STATUS_FAIL, STATUS_PENDING, STATUS_PREPARING, STATUS_SUCCESS, STATUS_WAITING } from "../configs/constant";

const initialInputCreateProduct = {
  name: "",
  price: "",
  description: "",
  type: "",
  size: [],
};
const initialErrorInputCreateProduct = {
  name: "",
  price: "",
  description: "",
  type: "",
  size: "",
};
const initialProductImage = {
  productImageMain: "",
  productImageSub: "",
};
export const orderStatus = ['All',STATUS_WAITING,STATUS_PENDING,STATUS_PREPARING,STATUS_DELIVERY,STATUS_COMPLETE];

export const paymentStatus = ['All',STATUS_WAITING, STATUS_SUCCESS,STATUS_FAIL]

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    createProductInput: initialInputCreateProduct,
    errorCreateProductInput: initialErrorInputCreateProduct,
    productImage: initialProductImage,
    errorProductImage: initialProductImage,
    sortOrderStatus: "All",
    sortPaymentStatus: 'All',
    orders:[],
    ordersSort: [],
  },
  reducers: {
    setCreateProductInput: (state, action) => {
      console.log(action.payload);
      if (action.payload.type) {
        console.log("eiei");
        state.createProductInput.size = [];
        state.createProductInput.type = action.payload.type;
      } else if (action.payload.input) {
        // console.log('eiei2')
        state.createProductInput = {
          ...state.createProductInput,
          ...action.payload.input,
        };
      } else if (action.payload.size) {
        console.log(action.payload);
        if (action.payload.size.isChecked) {
          state.createProductInput.size.push(action.payload.size.name);
        } else {
          state.createProductInput.size = state.createProductInput.size.filter(
            (item) => item !== action.payload.size.name
          );
        }
      }
    },
    setProductImage: (state, action) => {
      if (action.payload.file) {
        console.log(action.payload.file);
        if (action.payload.file.productImageMain === "") {
          state.productImage.productImageMain = "";
        }
        if (action.payload.file.productImageSub === "") {
          state.productImage.productImageSub = "";
        }
        if (action.payload.file.productImageMain) {
          state.productImage.productImageMain =
            action.payload.file.productImageMain;
        }
        if (action.payload.file.productImageSub) {
          state.productImage.productImageSub =
            action.payload.file.productImageSub;
        }
      }
    },
    setErrorProductImage: (state, action) => {
      state.errorProductImage = {
        ...state.errorProductImage,
        ...action.payload,
      };
    },
    setErrorCreateProductInput: (state, action) => {
      console.log(action.payload);
      if(action.payload===''){
        return state.errorCreateProductInput = initialErrorInputCreateProduct
      }
      state.errorCreateProductInput = action.payload;
    },
    resetCreateProductForm: (state, action) => {
      state.productImage = initialProductImage;
      state.errorProductImage = initialProductImage;
      state.createProductInput = initialInputCreateProduct;
      state.errorCreateProductInput = initialErrorInputCreateProduct;
    },
    sortOrder: (state, action) => {
      console.log(action.payload)
      if(action.payload?.type==='order'){
        state.sortOrderStatus = action.payload.sort;
      }else if(action.payload?.type==='payment'){
        state.sortPaymentStatus = action.payload.sort;
      }
      
      if(state.sortOrderStatus==='All') {
        state.orders = state.ordersSort
      }else{
        console.log('sort order status', state.sortOrderStatus)
        state.orders = state.ordersSort.filter(item=>item[0].Order.orderStatus===state.sortOrderStatus)
      }

      if(state.sortPaymentStatus!=='All'){
        state.orders = state.orders.filter(item=>item[0].Order.paymentStatus===state.sortPaymentStatus);
      }
    },
    setOrder: (state, action) => {
      state.orders = action.payload;
      state.ordersSort = action.payload
      state.sortOrderStatus = 'All'
      state.sortPaymentStatus = 'All'
    },
    updateOrderStatus: (state, action) => {
      console.log('done')
      const index = state.orders.findIndex(item=>item[0].Order.id===action.payload.id);
      console.log(index)
      state.orders[index][0].Order.orderStatus = action.payload.status
      const index2 = state.ordersSort.findIndex(item=>item[0].Order.id===action.payload.id);
      console.log(index2)
      state.ordersSort[index2][0].Order.orderStatus = action.payload.status
    }
  },
});

export default adminSlice.reducer;

export const {
  setCreateProductInput,
  setErrorCreateProductInput,
  setProductImage,
  setErrorProductImage,
  resetCreateProductForm,
  sortOrder,
  setOrder,
  updateOrderStatus
} = adminSlice.actions;
