import router from '@/router';
import axios from 'axios';

export default axios;
axios.defaults.baseURL = `${process.env.VUE_APP_BACKEND_DOMAIN}/api/v1/`;

let access_token;

// Add a request interceptors
const addAuthToken = request => {
    request.headers.Authorization = `Bearer ${access_token}`;
    return request;
};

axios.interceptors.request.use(addAuthToken);

// Add a response interceptors
const successHandler = response => {
    if (response.config.url === 'auth/login/')
        access_token = response.data.access;
    return response;
};

const errorHandler = async error => {
    if (error.response.status >= 500) {
        router.push({ name: 'Error5xx' });
        return Promise.reject(error);
    } else if (
        error.response.status === 401 &&
        !error.config.url.startsWith('auth/')
    ) {
        try {
            await renewAccessToken();
            return axios.request(error.config);
        } catch {
            router.push({ name: 'login' });
        }
    }

    return Promise.reject(error);
};

const renewAccessToken = async () => {
    let response = await axios.post('auth/access/');
    access_token = response.data.access;
};

axios.interceptors.response.use(successHandler, errorHandler);
