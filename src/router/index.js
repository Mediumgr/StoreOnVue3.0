import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () =>
      import(
        /* webpackChunkName: "MainPage"*/
        "../components/HomePage/MainPage"
      ),
  },
  {
    path: "/product/:id",
    props: true,
    name: "ProductDetails",
    component: () =>
      import(
        /* webpackChunkName: "ProductDetails"*/
        "../views/Product/ProductDetails"
      ),
    children: [
      {
        path: "delivery",
        name: "ProductDelivery",
        component: () =>
          import(
            /* webpackChunkName: "ProductDetails"*/
            "../views/Product/ProductDelivery"
          ),
      },
    ],
  },
  {
    path: "/products",
    name: "ProductPage",
    component: () =>
      import(
        /* webpackChunkName: "Products"*/
        "../components/ProductPage/Products.vue"
      ),
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component: () =>
      import(
        /* webpackChunkName: "CheckOut"*/
        "../components/CheckOut/CheckOut"
      ),
  },
  {
    path: "/gotocart",
    name: "GoToCart",
    component: () =>
      import(
        /* webpackChunkName: "GoToCart"*/
        "../components/CartComp/GoToCart"
      ),
  },
  {
    path: "/error/:error",
    props: true,
    name: "ErrorDisplay",
    component: () =>
      import(
        /* webpackChunkName: "ErrorDisplay" */
        "../views/Product/ErrorDisplay"
      ),
  },
  {
    path: "/404/:resource",
    props: true,
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "NotFound"*/
        "../views/Product/NotFound"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
