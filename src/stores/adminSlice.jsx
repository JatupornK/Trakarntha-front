import { createSlice } from "@reduxjs/toolkit";

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
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    createProductInput: initialInputCreateProduct,
    errorCreateProductInput: initialErrorInputCreateProduct,
    productImage: initialProductImage,
    errorProductImage: initialProductImage,
    sortOrder: "",
    orders:[],
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
      state.errorCreateProductInput = action.payload;
    },
    resetCreateProductForm: (state, action) => {
      state.productImage = initialProductImage;
      state.errorProductImage = initialProductImage;
      state.createProductInput = initialInputCreateProduct;
      state.errorCreateProductInput = initialErrorInputCreateProduct;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setOrder: (state, action) => {
      state.orders = action.payload;
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
  setSortOrder,
  setOrder
} = adminSlice.actions;
