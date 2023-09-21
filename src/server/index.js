import axios from "axios";

const request = axios.create({
  baseURL: "https://650b94bddfd73d1fab0a104b.mockapi.io/category/",
  timeout: 10000,
});

export default request;
