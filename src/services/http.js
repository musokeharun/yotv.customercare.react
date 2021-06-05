import axios from "axios";
import {toast} from "react-toastify";
import {getToken} from "../auth/auth";

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        // console.log("logging the error", error);
        // alert("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error);
});

axios.interceptors.request.use(
    function (config) {
        config.headers.token = getToken();
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
