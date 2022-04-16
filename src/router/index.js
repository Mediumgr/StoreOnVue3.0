import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () =>
      import(
        /* webpackChunkName: "MainPage"*/ "@/components/HomePage/MainPage"
      ),
  },
  {
    path: "/product/3",
    name: "ProductDetails",
    component: () =>
      import(/* webpackChunkName: "ProductDetails"*/ "@/views/ProductDetails"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
