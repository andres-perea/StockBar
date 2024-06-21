import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://18.117.161.215:5000",
});

export default axiosInstance;
