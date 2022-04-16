import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/Mediumgr/StoreOnVue3.0/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getProducts() {
    return apiClient.get("/filtered");
  },
  getProduct(id) {
    return apiClient.get("/filtered/" + id);
  },
};
