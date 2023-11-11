import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://samane.zbbo.net/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (e.g., add headers, authentication tokens)
    const accessToken = window.localStorage.getItem("AccessToken");
    //console.log(config);
    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    //console.log(error);
    return Promise.reject(error);
  }
);
// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here (e.g., parse, transform)
    console.log(response);
    return response;
  },
  (error) => {
    // Handle response errors here
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
