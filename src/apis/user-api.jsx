import axios from "../configs/axios";

export const addProductToCart = (input) => axios.post("/users/cart", input);

export const deleteProductFromCart = (cartId) =>
  axios.patch("/users/cart", cartId);

export const clickIncreaseProductInCart = (input) =>
  axios.patch("/users/cart/increase", input);

export const clickDecreaseProductInCart = (input) =>
  axios.patch("/users/cart/decrease", input);

export const createNewAddress = (input) => axios.post("/users/address", input);

export const editAddress = (input) => axios.patch('/users/edit/address', input);

export const deleteAddress = (input) => axios.patch('/users/delete/address', input);

export const chooseNewAddress = (addressId) => axios.patch('/users/address/update', addressId)

export const createCustomer = (input) => axios.post('/users/stripe/create-customer', input)

export const createPaymentIntent = (input) => axios.post('/users/stripe/payment-intent', input);

export const getLastFour = () => axios.get('/users/stripe/last/payment-method');

export const createUserPayment = (input) => axios.post('/users/payment', input) 

export const chooseNewPayment = (paymentId) => axios.patch('/users/payment/update', paymentId)

export const getUpdatedPaymentTime = () => axios.get('/users/payment/last-update');

export const createOrder = (input) => axios.post('/users/create-order', input)

export const paymentSuccess = (orderId) => axios.patch('/users/payment/success', orderId)