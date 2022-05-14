import { createStore } from "vuex";
import EventService from "@/services/EventService.js";
import router from "@/router";
import additional from "./additional";
import loading from "./loading";

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
    FILL_OF_FILTER(state, payload) {
      state.filtered = payload;
    },
    FILTER_PRODUCTS_REGEXP(state, payload) {
      let regexp = new RegExp(payload, "i");
      state.filtered = state.products.filter((product) =>
        regexp.test(product.name)
      );
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
    UPDATE_PRODUCT_IN_CART(state, product) {
      let found = state.cart.find((item) => item.id === product.id);
      state.cart.splice(state.cart.indexOf(found), 1, product);
    },
    DELETE_PRODUCT_IN_CART(state, payload) {
      state.cart.splice(state.cart.indexOf(payload), 1);
    },
    CLEAR_CART(state) {
      state.cart.splice(0, state.cart.length);
    },
    CONCAT_ALL_PRODUCTS(state) {
      state.products = state.products.concat(state.extraProducts);
    },
    USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    getProducts({ commit }) {
      return EventService.getProducts()
        .then((response) => {
          commit("SET_PRODUCTS", response.data);
          commit("FILL_OF_FILTER", response.data);
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
          commit("FILL_OF_FILTER", state.products);
        })
        .catch((error) => {
          throw error;
        });
    },
    actionForFilter({ commit }) {
      return EventService.getExtraProducts()
        .then((response) => {
          commit("SET_EXTRA_PRODUCTS", response.data);
        })
        .then(() => {
          commit("CONCAT_ALL_PRODUCTS");
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
        existingProduct.size = payload.size;
        return EventService.putToCart(existingProduct).catch((error) => {
          throw error;
        });
      }
    },
    postMochinoToCart({ state, commit }, payload) {
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
        existingProduct.quantity += payload.quantity;
        return EventService.putToCart(existingProduct).catch((error) => {
          throw error;
        });
      }
    },
    updateProduct({ commit }, updatedProduct) {
      return EventService.putToCart(updatedProduct)
        .then((response) => {
          commit("UPDATE_PRODUCT_IN_CART", response.data);
        })
        .catch((error) => {
          throw error;
        });
    },
    remove({ commit }, payload) {
      return EventService.deleteProduct(payload)
        .then(() => {
          commit("DELETE_PRODUCT_IN_CART", payload);
        })
        .catch((error) => {
          throw error;
        });
    },
    //КАК ЕЩЕ СДЕЛАТЬ МЕТОД, ЧТОБЫ УДАЛЯЛ ВСЕ ИМЕЮЩИЕСЯ ТОВАРЫ МАГАЗИНА ИЗ КОРЗИНЫ, НО НЕ ПАДАЛ СЕРВЕР?(НА 2-3 РАЗ ПРИ ПОПЫТКЕ УДАЛИТЬ ВСЕ ТОВАРЫ ПАДАЕТ СЕРВАК):
    clearCart({ state, commit }) {
      state.cart.forEach((element) => {
        return EventService.deleteProduct(element);
      });
      commit("CLEAR_CART");
    },
    user({ commit }, payload) {
      commit("USER", payload);
    },
  },
  getters: {
    cartProductsAmount: (state) =>
      state.cart.reduce((accum, item) => accum + item.quantity, 0),
    totalPrice: (state) =>
      state.cart.reduce((accum, item) => accum + item.price * item.quantity, 0),
    filteredLength: (state) => {
      return state.filtered.length;
    },
  },
  modules: {
    additional,
    loading,
  },
});
