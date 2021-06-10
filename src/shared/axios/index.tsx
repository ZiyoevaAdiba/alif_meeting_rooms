import axios from "axios";
import { getToken } from "../../store/actions/login";

export const Axios = axios.create();

Axios.interceptors.request.use(config => {

    const baseUrl = process.env.NODE_ENV === 'production'
        ?
        `${process.env.REACT_APP_BASE_URL}${config.url}`
        :
        `${process.env.REACT_APP_DEV_URL}${config.url}`;

    const token = getToken();

    const updatedConfig = {
        ...config,
        url: baseUrl,
        headers: token && {
            'Authorization': `Bearer ${token}`
        }
    };

    return updatedConfig;
}, error => {
    console.log(error);
    return Promise.reject(error);
});