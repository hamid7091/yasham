import axios from "axios";

const axiosInstanceLogin = axios.create({
  baseURL: "https://samane.zbbo.net/api/v1",
});

export default axiosInstanceLogin;
