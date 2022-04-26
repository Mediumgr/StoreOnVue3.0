import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () =>
      import(
        /* webpackChunkName: "MainPage"*/ "../components/HomePage/MainPage"
      ),
  },
  {
    path: "/product/:id",
    props: true,
    name: "ProductDetails",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetails"*/ "../views/Product/ProductDetails"
      ),
  },
  {
    path: "/products",
    name: "ProductPage",
    component: () =>
      import(
        /* webpackChunkName: "Products"*/ "../components/ProductPage/Products.vue"
      ),
  },
  {
    path: "/error/:error",
    props: true,
    name: "ErrorDisplay",
    component: () =>
      import(
        /* webpackChunkName: "ErrorDisplay"*/
        "../views/Product/ErrorDisplay"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
