import axios from 'axios';

axios.defaults.baseURL = import.meta.env.REACT_APP_TRAKARNTHA_DATABASE_URL|| 'http://localhost:8008';

// axios.interceptors.request.use(config => {
//     if()
// })
export default axios