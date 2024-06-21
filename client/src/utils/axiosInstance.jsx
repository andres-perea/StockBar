import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://18.117.161.215:5000",
});

export default axiosInstance;
