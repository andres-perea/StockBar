import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ec2-18-117-161-215.us-east-2.compute.amazonaws.com:5000",
});

export default axiosInstance;
