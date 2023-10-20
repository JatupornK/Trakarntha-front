import axios from '../configs/axios';

export const getAllProducts = () => axios.get('/products')

export const getMaxMin = () => axios.get('/products/range')

export const getProductSize = () => axios.get('/products/size')