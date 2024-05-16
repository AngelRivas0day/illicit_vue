import axios from 'axios';

export default function setup() {
    axios.interceptors.request.use(function (config) {
        return config;
    }, function (err) {
        return Promise.reject(err);
    });
}
