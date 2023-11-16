// import { useEffect, useReducer } from "react";
// import { useState } from "react";
// import { createContext } from "react";
// import * as productsApi from "../apis/product-api";
// import * as constant from "../configs/constant";
// export const ProductContext = createContext();

// // const reducerFunction = (state, action) => {
// //   switch(action.type) {
// //     case 'Newest': return state.slice(0).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
// //     case 'HighToLow': return state.slice(0).sort((a, b) => (a.price > b.price ? 1 : -1));
// //     case 'LowToHigh': return state.slice(0).sort((a, b) => (a.price < b.price ? 1 : -1));
// //     case 'SortBy': return state.slice(0).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
// //   }
// // }
// export default function ProductContextProvider({ children }) {
//   const [products, setProducts] = useState([]);
//   const [sort, setSort] = useState(false);
//   const [text, setText] = useState('Sort by');
//   const category = constant.CATEGORY;
//   // const [state, dispatch] = useReducer(reducerFunction, [])

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       const [result, range, size] = await Promise.all([
//         productsApi.getAllProducts(),
//         productsApi.getMaxMin(),
//         productsApi.getProductSize(),
//       ]);
//       let Size =[];
//       for(let item of size.data.size) {
//         Size.push(item.size)
//       }
//       setProducts(result.data);
//       category[1].type = range.data;
//       category[2].type = Size;
//     };
//     fetchAllProducts();
//   }, []);

//   const sortByNewest = () => {
//     setProducts((prev) =>
//       prev.slice(0).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
//     ); // slice ทำให้ react รู้ว่าต้องทำการ rerender เนื่องจากเกิดการเปลี่ยนแปลง
//     setSort(false);
//     setText('Newest')
//   };
//   const sortByPriceHToL = () => {
//     setProducts((prev) =>
//       prev.slice(0).sort((a, b) => (a.price > b.price ? 1 : -1))
//     );
//     setSort(false);
//     setText('Price (low to high)')
//   };
//   const sortByPriceLToH = () => {
//     setProducts((prev) =>
//       prev.slice(0).sort((a, b) => (a.price < b.price ? 1 : -1))
//     );
//     setSort(false);
//     setText('Price (high to low)')
//   };
//   const sortBy = () => {
//     setProducts((prev) =>
//       prev.slice(0).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
//     );
//     setSort(false);
//     setText('Sort by')
//   }
//   const sortList = [
//     {title: 'Sort by', func: sortBy},
//     { title: "Newest", func: sortByNewest },
//     { title: "Price (low to high)", func: sortByPriceHToL },
//     { title: "Price (high to low)", func: sortByPriceLToH },
//   ];

//   return (
//     <ProductContext.Provider
//       value={{ products, category, setProducts, sortList, sort, setSort,text }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// }
