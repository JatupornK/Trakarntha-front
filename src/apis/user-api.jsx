import axios from "../configs/axios";

export const addProductToCart = (input) => axios.post("/users/cart", input);
