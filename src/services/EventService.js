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
    return apiClient.get("/filtered");
  },
  getProduct(id) {
    return apiClient.get("/filtered/" + id);
  },
  postProductToCart(product) {
    return apiClient.post("/cart", product);
  },
  getProductFromCart() {
    return apiClient.get("/cart");
  },
};
