import { createStore } from "vuex";
import EventService from "@/services/EventService.js";

export default createStore({
  state: {
    filtered: [],
    cart: [],
    product: [],
    id: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.filtered = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    ADD_PRODUCT_TO_CART(state, product) {
      state.cart.push(product);
    },
    COUNTER_ID(state, productId) {
      state.id = productId;
    },
  },
  actions: {
    getProducts({ commit }) {
      EventService.getProducts()
        .then((response) => {
          commit("SET_PRODUCTS", response.data);
        })
        .catch((error) => {
          console.log("SET_PRODUCTS", error);
        });
    },
    getProduct({ commit }, id) {
      EventService.getProduct(id)
        .then((response) => {
          commit("SET_PRODUCT", response.data);
        })
        .catch((error) => {
          console.log("SET_PRODUCT", error);
        });
    },
    cartFetch({ state }) {
      EventService.cartFetch().then((response) => {
        state.cart = response.data;
      });
    },
    postToCart({ state, commit }, payload) {
      let existingProduct = state.cart.find(
        (product) => product.id === payload.id
      );
      if (!existingProduct) {
        EventService.postToCart(payload)
          .then((response) => {
            commit("ADD_PRODUCT_TO_CART", response.data);
          })
          .catch((error) => {
            console.log("ADD_PRODUCT_TO_CART", error);
          });
      } else {
        existingProduct.quantity++;
        EventService.putToCart(existingProduct).catch((error) =>
          console.log("ADD_PRODUCT_TO_CART", error)
        );
      }
    },
    remove({ state, commit }, payload) {
      EventService.deleteProduct(payload)
        .then(() => {
          state.cart.splice(state.cart.indexOf(payload), 1);
        })
        .then(() => {
          commit("COUNTER_ID", payload.id);
        });
    },
    updateQuantity({ state }, payload) {
      let existingProduct = state.cart.find((item) => item.id === payload.id);
      existingProduct.quantity--;
      EventService.putToCart(existingProduct).catch((error) =>
        console.log("updateQuantity", error)
      );
    },
  },
  getters: {
    cartProductsAmount: (state) =>
      state.cart.reduce((accum, item) => accum + item.quantity, 0),
    totalPrice: (state) =>
      state.cart.reduce((accum, item) => accum + item.price * item.quantity, 0),
    id: (state) => state.id,
  },
  modules: {},
});
