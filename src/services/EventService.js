import axios from "axios";

//baseURL: "https://my-json-server.typicode.com/Mediumgr/StoreOnVue3.0",

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getProducts() {
    return apiClient.get("/products");
  },
  getExtraProducts() {
    return apiClient.get("/extraProducts");
  },
  fetchAdditionalProducts() {
    return apiClient.get("/additionalProducts");
  },
  getProduct(id) {
    return apiClient.get(`/products/${id}`);
  },
  getExtraProduct(id) {
    return apiClient.get(`/extraProducts/${id}`);
  },
  getAdditionalProduct(id) {
    return apiClient.get(`/additionalProducts/${id}`);
  },
  cartFetch() {
    return apiClient.get("/cart");
  },
  postToCart(product) {
    return apiClient.post("/cart", product);
  },
  putToCart(payload) {
    return apiClient.put(`/cart/${payload.id}`, payload);
  },
  deleteProduct(payload) {
    return apiClient.delete(`/cart/${payload.id}`);
  },
};
