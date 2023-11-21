import { createSlice } from "@reduxjs/toolkit";
import * as productsApi from "../apis/product-api";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productsFilter: [],
    sort: false,
    textSort: "Sort by",
    textCategory: "All",
    filter: [],
    slide: 0,
    size: [], //filter size
    selectedSize: "", //select size (modal)
    quantity: 1,
    productType: [],//keep product type
    productSize: [],//keep product size
  },
  reducers: {
    resetState: (state, action) => {
      // state.isHover = Array.from(state.products, (x)=> false)
      state.filter = [true, false, false];
      state.textSort = "Sort by";
      state.size = [];
      state.slide = action.payload;
      state.textCategory = "All";
    },
    setSlide: (state, action) => {
      state.slide = action.payload;
    },
    getAllProducts: (state, action) => {
      state.products = action.payload;
      state.productsFilter = state.products;
    },
    setSortClose: (state, action) => {
      state.sort = false;
    },
    setSortClick: (state, action) => {
      state.sort = !state.sort;
    },
    sortAll: (state, action) => {
      //action payload (sort)
      console.log(action.payload);
      if (
        action.payload.type === "Newest" ||
        action.payload.type === "Sort by"
      ) {
        state.textSort = action.payload.type;
        state.sort = false;
        state.products = state.products.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );
      } else if (action.payload.type === "Price (high to low)") {
        state.textSort = action.payload.type;
        state.sort = false;
        state.products = state.products.sort((a, b) =>
          a.price < b.price ? 1 : a.price === b.price ? 0 : -1
        );
      } else if (action.payload.type === "Price (low to high)") {
        state.textSort = action.payload.type;
        state.sort = false;
        state.products = state.products.sort((a, b) =>
          a.price > b.price ? 1 : a.price === b.price ? 0 : -1
        );
      }
    },
    setFilterClick: (state, action) => {
      state.filter[action.payload] = !state.filter[action.payload];
    },
    filterAll: (state, action) => {
      //action payload (filter)
      // console.log(action.payload);
      if (action.payload.type === "price") {
        state.slide = action.payload.value;
      } else if (action.payload.type === "type") {
        state.textCategory = action.payload.value;
      } else if (action.payload.type === "size") {
        if (action.payload.isChecked) {
          state.size.push(action.payload.name);
        } else {
          state.size = state.size.filter(
            (item) => item !== action.payload.name
          );
        }
      }
      //sort
      if (state.textSort === "Sort by" || state.textSort === "Newest") {
        state.products = state.productsFilter.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );
      } else if (state.textSort === "Price (high to low)") {
        state.products = state.productsFilter.sort((a, b) =>
          a.price < b.price ? 1 : a.price === b.price ? 0 : -1
        );
      } else if (state.textSort === "Price (low to high)") {
        state.products = state.productsFilter.sort((a, b) =>
          a.price > b.price ? 1 : a.price === b.price ? 0 : -1
        );
      }
      //filter type
      if (
        state.textCategory !== "All" &&
        state.textCategory !== "BEST SELLER"
      ) {
        state.products = state.products.filter(
          (item) =>
            item.Type.type.toLowerCase() === state.textCategory.toLowerCase()
        );
      } else if (state.textCategory === "BEST SELLER") {
        state.products = state.products.filter(
          (item) => item.bestSeller === true
        );
      }
      //filter size
      if (state.size.length > 0) {
        state.products = state.products.filter((item) => {
          let isInclude = false;
          if (item.ProductSizes.length > 0)
            for (let i = 0; i < item.ProductSizes.length; i++) {
              // console.log(Object.values(item.ProductSizes[i])[1].size);
              if (
                state.size.includes(Object.values(item.ProductSizes[i])[1].size)
              ) {
                isInclude = true;
              }
            }
          if (isInclude) return true;
        });
      }
      //filter price
      state.products = state.products.filter(
        (item) => item.price >= state.slide
      );
    },
    setSelectedSize: (state, action) => {
      // console.log(action.payload)
      state.selectedSize = action.payload;
    },
    increaseQuantity: (state, action) => {
      state.quantity = state.quantity + 1;
    },
    decreaseQuantity: (state, action) => {
      if (state.quantity > 1) {
        state.quantity = state.quantity - 1;
      }
    },
    resetSelected: (state, action) => {
      state.quantity = 1;
      state.selectedSize = "";
    },
    fetchProductType: (state, action) => {
      state.productType = action.payload
    },
    fetchProductSize: (state, action) => {
      state.productSize = action.payload
    },
    updateProductStatus: (state, action) => {
      let index = state.products.findIndex(item=>item.id===action.payload.id)
      state.products[index].isDisabled = !state.products[index].isDisabled
      state.productsFilter[index].isDisabled = !state.productsFilter[index].isDisabled
    }
    // setHover: (state, action) => {
    //   state.isHover[action.payload] = !state.isHover[action.payload]
    // }
  },
});

export default productSlice.reducer;

export const {
  getAllProducts,
  setSortClick,
  setSortClose,
  setFilterClick,
  resetState,
  setSlide,
  filterAll,
  sortAll,
  setSelectedSize,
  increaseQuantity,
  decreaseQuantity,
  resetSelected,
  fetchProductSize,
  fetchProductType,
  updateProductStatus
} = productSlice.actions; //destructuring from productSlice

export const fetchProducts = () => async (dispatch) => {
  try {
    const res = await productsApi.getAllProducts();
    console.log(res)
    dispatch(getAllProducts(res.data));
  } catch (err) {
    alert("can't load products");
  }
};

export const sortList = [
  { title: "Sort by" },
  { title: "Newest" },
  { title: "Price (low to high)" },
  { title: "Price (high to low)" },
];

export const CATEGORY = [
  {
    title: "Category",
    type: [
      { title: "All" },
      { title: "BEST SELLER" },
      { title: "Bracelet" },
      { title: "Ring" },
      { title: "Earring" },
      { title: "Necklace" },
    ],
    box: "list",
  },
  {
    title: "Price",
    box: "range",
  },
  {
    title: "Size",
    box: "checkbox",
  },
];
export const getMaxMinPrice = () => async (dispatch) => {
  try {
    const [range, size] = await Promise.all([
      productsApi.getMaxMin(),
      productsApi.getProductSize(),
    ]);
    console.log(size)
    CATEGORY[1].type = range.data;
    CATEGORY[2].type = size.data.size;
    dispatch(resetState(range.data.min));
    // dispatch(filterByPrice(range.data.min));
  } catch (err) {
    console.log("Cann't get a max min price");
  }
};
