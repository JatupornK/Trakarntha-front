import axios from "../configs/axios";

export const createUser = (input) => axios.post("/auth/register", input);

export const login = (input) => axios.post("/auth/login", input);
