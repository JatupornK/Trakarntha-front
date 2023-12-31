import axios from "../configs/axios";

export const createUser = (input) => axios.post("/auth/register", input);

export const login = (input) => axios.post("/auth/login", input);

export const getMe = () => axios.get('/auth/me')

export const getUserCartData = () => axios.get('/auth/cart/me')