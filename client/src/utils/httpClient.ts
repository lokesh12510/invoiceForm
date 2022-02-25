import axios from "axios";
import { BASE_URL } from "../Constant";

const HEADERS = {
  "Content-Type": "application/json",
};

export const HttpClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    ...HEADERS,
  },
});

HttpClient.interceptors.request.use((config) => {
  return config;
});

HttpClient.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
