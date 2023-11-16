import axios from '../configs/axios';

export const createProduct = (input) => axios.post('/admin/create-product', input);

export const fetchAllOrder = () => axios.get('/admin/orders');