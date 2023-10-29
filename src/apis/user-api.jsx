import axios from "../configs/axios";

export const addProductToCart = (input) => axios.post("/users/cart", input);

export const deleteProductFromCart = (cartId) =>
  axios.delete("/users/cart", { data: { cartId } });

export const clickIncreaseProductInCart = (input) =>
  axios.patch("/users/cart/increase", input);

export const clickDecreaseProductInCart = (input) =>
  axios.patch("/users/cart/decrease", input);
