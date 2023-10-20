import axios from 'axios';
import { getAccessToken } from '../utills/localStorage';

axios.defaults.baseURL = import.meta.env.REACT_APP_TRAKARNTHA_DATABASE_URL|| 'http://localhost:8008';

// config interceptor to axios ก่อนที่จะส่ง req หรือรับ res จะต้องผ่าน interceptor => สามารถสั่งให้ทำอะไรก่อนได้
axios.interceptors.request.use(config=>{
    if(getAccessToken()) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    return config //ต้อง return ไม่งั้นจะเป็นการส่ง undefined ไป
},err=>{
    return Promise.reject(err) //ส่ง err ไปในรูปแบบ promise
}); 
//ตอนส่ง req มา axios จะส่งค่ามาให้ config ที่ parameterตัวที่ 1, ตอนส่ง req มาถ้าเกิด errror จะส่งมาที่่ err แทน config

export default axios