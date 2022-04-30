import { createStore } from "vuex";
import EventService from "@/services/EventService.js";
import router from "@/router";

export default createStore({
  state: {
    products: [],
    cart: [],
    product: [],
    filtered: [],
    extraProducts: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_EXTRA_PRODUCTS(state, products) {
      state.extraProducts = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    ADD_PRODUCT_TO_CART(state, product) {
      state.cart.push(product);
    },
    FILTER_PRODUCTS(state, payload) {
      state.filtered = payload;
    },
    CONCAT_ALL_PRODUCTS(state) {
      state.products = state.products.concat(state.extraProducts);
    },
  },
  actions: {
    getProducts({ commit }) {
      return EventService.getProducts()
        .then((response) => {
          commit("SET_PRODUCTS", response.data);
          commit("FILTER_PRODUCTS", response.data);
        })
        .catch((error) => {
          throw error;
        });
    },
    getExtraProducts({ commit, state }) {
      return EventService.getExtraProducts()
        .then((response) => {
          commit("SET_EXTRA_PRODUCTS", response.data);
        })
        .then(() => {
          commit("CONCAT_ALL_PRODUCTS");
        })
        .then(() => {
          commit("FILTER_PRODUCTS", state.products);
        })
        .catch((error) => {
          throw error;
        });
    },
    getProduct({ commit, dispatch }, id) {
      //id товара (от 1 до 9) меньше или ровно 9 (кол-ву товаров в products db.json)
      if (id <= 9) {
        return EventService.getProduct(id)
          .then((response) => {
            commit("SET_PRODUCT", response.data);
          })
          .catch(() => {
            router.push({
              name: "NotFound",
              params: {
                resource: "product",
              },
            });
          });
      } else dispatch("getExtraProduct", id);
    },
    getExtraProduct({ commit }, id) {
      return EventService.getExtraProduct(id)
        .then((response) => {
          commit("SET_PRODUCT", response.data);
        })
        .catch(() => {
          router.push({
            name: "NotFound",
            params: {
              resource: "product",
            },
          });
        });
    },
    cartFetch({ state }) {
      return EventService.cartFetch()
        .then((response) => {
          state.cart = response.data;
        })
        .catch((error) => {
          throw error;
        });
    },
    postToCart({ state, commit }, payload) {
      let existingProduct = state.cart.find(
        (product) => product.id === payload.id
      );
      if (!existingProduct) {
        return EventService.postToCart(payload)
          .then((response) => {
            commit("ADD_PRODUCT_TO_CART", response.data);
          })
          .catch((error) => {
            throw error;
          });
      } else {
        existingProduct.quantity++;
        return EventService.putToCart(existingProduct).catch((error) => {
          throw error;
        });
      }
    },
    remove({ state }, payload) {
      return EventService.deleteProduct(payload)
        .then(() => {
          state.cart.splice(state.cart.indexOf(payload), 1);
        })
        .catch((error) => {
          throw error;
        });
    },
    updateQuantity({ state }, payload) {
      let existingProduct = state.cart.find((item) => item.id === payload.id);
      existingProduct.quantity--;
      return EventService.putToCart(existingProduct).catch((error) => {
        throw error;
      });
    },
    filterProducts({ state, commit }, payload) {
      let regexp = new RegExp(payload, "i");
      let filtered = state.products.filter((product) =>
        regexp.test(product.name)
      );
      commit("FILTER_PRODUCTS", filtered);
    },
  },
  getters: {
    cartProductsAmount: (state) =>
      state.cart.reduce((accum, item) => accum + item.quantity, 0),
    totalPrice: (state) =>
      state.cart.reduce((accum, item) => accum + item.price * item.quantity, 0),
  },
  modules: {},
});
