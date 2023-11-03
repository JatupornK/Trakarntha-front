import axios from "../configs/axios";

export const addProductToCart = (input) => axios.post("/users/cart", input);

export const deleteProductFromCart = (cartId) =>
  axios.delete("/users/cart", { data: { cartId } });

export const clickIncreaseProductInCart = (input) =>
  axios.patch("/users/cart/increase", input);

export const clickDecreaseProductInCart = (input) =>
  axios.patch("/users/cart/decrease", input);

export const createNewAddress = (input) => axios.post("/users/address", input);

export const chooseNewAddress = (addressId) => axios.patch('/users/address/update', addressId)

export const createCustomer = (input) => axios.post('/users/stripe/create-customer', input)

export const createPaymentIntent = (input) => axios.post('/users/stripe/payment-intent', input);

export const getLastFour = () => axios.get('/users/stripe/last/payment-method');

export const createUserPayment = (input) => axios.post('/users/payment', input) 
