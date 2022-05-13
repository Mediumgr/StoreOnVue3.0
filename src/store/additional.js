export default {
  state: {
    additionalProducts: [],
  },
  mutations: {
    ADDITIONAL_PRODUCTS(state, products) {
      state.additionalProducts = products;
    },
  },
  actions: {
    fetchAdditionalProducts({ commit }) {
      return new Promise((resolve) => {
        const products = [
          {
            img: "black-girl.png",
            id: 19,
            name: "SWEATER",
            price: 50,
          },
          {
            img: "secondgirl.png",
            id: 20,
            name: "DRESS",
            price: 60,
          },
          {
            img: "third.png",
            id: 21,
            name: "SWEATER",
            price: 65,
          },
          {
            img: "forthgirl.png",
            id: 22,
            name: "SWEATER",
            price: 70,
          },
        ];
        resolve(products);
      }).then((response) => {
        commit("ADDITIONAL_PRODUCTS", response);
      });
    },
  },
  getters: {
    products(state) {
      return state.additionalProducts;
    },
  },
};
