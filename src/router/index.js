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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
