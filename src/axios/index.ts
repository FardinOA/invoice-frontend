// Add a request interceptor

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});
api.interceptors.request.use(
  function (config) {
    // set Bearer token on the header
    const token = localStorage.getItem("invoice_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // if unauthorized then remove the token

    if (error?.response?.status === 401) {
      localStorage.removeItem("invoice_token");
      //reload the window
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { api };
