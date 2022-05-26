import { createStore } from "vuex";
import EventService from "@/services/EventService.js";
import router from "@/router";
import shared from "./loading";

export default createStore({
  state: {
    products: [],
    cart: [],
    product: [],
    filtered: [],
    mainPage: [],
    extraProducts: [],
    additionalProducts: [],
    user: null,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    FILL_OF_FILTER(state, payload) {
      state.filtered = payload;
    },
    FILL_OF_MAIN_PAIGE(state, payload) {
      state.mainPage = payload;
    },
    FILTER_PRODUCTS_REGEXP(state, payload) {
      let regexp = new RegExp(payload, "i");
      state.filtered = state.products.filter((item) => regexp.test(item.name));
    },
    SET_EXTRA_PRODUCTS(state, products) {
      state.extraProducts = products;
    },
    PRODUCTS_ZEROING(state) {
      state.products.length = 0;
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
    CONCAT_EXTRA_PRODUCTS(state) {
      state.products = state.products.concat(state.extraProducts);
    },
    USER(state, payload) {
      state.user = payload;
    },
    ADDITIONAL_PRODUCTS(state, payload) {
      state.additionalProducts = payload;
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
    getProductsForMainPage({ commit }) {
      return EventService.getProducts()
        .then((response) => {
          commit("FILL_OF_MAIN_PAIGE", response.data);
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
          commit("CONCAT_EXTRA_PRODUCTS");
        })
        .then(() => {
          commit("FILL_OF_FILTER", state.products);
        })
        .catch((error) => {
          throw error;
        });
    },
    fetchAdditionalProducts({ commit }) {
      return EventService.fetchAdditionalProducts()
        .then((response) => {
          commit("ADDITIONAL_PRODUCTS", response.data);
        })
        .catch((error) => {
          throw error;
        });
    },
    actionForFilter({ commit }, userSearch) {
      commit("setLoading", true);
      EventService.getProducts()
        .then((response) => {
          commit("SET_PRODUCTS", response.data);
        })
        .then(() => {
          EventService.getExtraProducts()
            .then((response) => {
              commit("SET_EXTRA_PRODUCTS", response.data);
            })
            .then(() => {
              commit("CONCAT_EXTRA_PRODUCTS");
            })
            .then(() => {
              commit("FILTER_PRODUCTS_REGEXP", userSearch);
            });
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    getProduct({ commit, dispatch }, id) {
      //id товара (от 1 до 9 = кол-ву товаров в db.json)
      if (id <= 9) {
        EventService.getProduct(id)
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
      }
      //id товара (от 10 до 18 = кол-ву товаров в db.json)
      if (id > 9 && id < 19) {
        dispatch("getExtraProduct", id);
      }
      //id товара (от 19 до 22 = кол-ву товаров в db.json)
      if (id > 18 && id < 23) {
        dispatch("getAdditionalProduct", id);
      }
      if (id > 22) {
        dispatch("getSlidersProduct", id);
      }
    },
    getExtraProduct({ commit }, id) {
      EventService.getExtraProduct(id)
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
    getAdditionalProduct({ commit }, id) {
      EventService.getAdditionalProduct(id)
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
    getSlidersProduct({ commit }, id) {
      EventService.getSlidersProduct(id)
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
    remove({ commit, state }, payload) {
      state.loading = true;
      return EventService.deleteProduct(payload)
        .then(() => {
          commit("DELETE_PRODUCT_IN_CART", payload);
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          state.loading = false;
        });
    },
    //КАК ЕЩЕ СДЕЛАТЬ МЕТОД, ЧТОБЫ УДАЛЯЛ ВСЕ ИМЕЮЩИЕСЯ ТОВАРЫ МАГАЗИНА ИЗ КОРЗИНЫ, НО НЕ ПАДАЛ СЕРВЕР?(НА ВТОРОЙ ИЛИ ТРЕТИЙ РАЗ ПРИ ПОПЫТКЕ УДАЛИТЬ ВСЕ ТОВАРЫ (ЕСЛИ ИХ МНОГО В КОРЗИНЕ), ТО ПАДАЕТ СЕРВАК):
    clearCart({ state, commit }) {
      state.cart.forEach((element) => {
        return EventService.deleteProduct(element).catch((error) => {
          throw error;
        });
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
    additionalProducts(state) {
      return state.additionalProducts;
    },
  },
  modules: {
    shared,
  },
});
