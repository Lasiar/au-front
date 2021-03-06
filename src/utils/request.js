import axios from "axios";
import store from "../store/store";

// create an axios instance
const service = axios.create({
  baseURL: "/api", // url = base url + request url
  withCredentials: true // send cookies when cross-domain requests
});

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    return res;
  },
  error => {
    store.dispatch("info/setError", {
      text: error,
      subText: error.response.data,
      show: true
    });
    return Promise.reject(error);
  }
);

export default service;
