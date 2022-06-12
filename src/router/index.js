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
            /* webpackChunkName: "ProductDelivery"*/
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
    path: "/single",
    name: "SinglePage",
    component: () =>
      import(
        /* webpackChunkName: "SinglePage"*/
        "../components/Single/SinglePage"
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
        "../views/NotFound/ErrorDisplay"
      ),
  },
  {
    path: "/404/:resource",
    props: true,
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "NotFound"*/
        "../views/NotFound/NotFound"
      ),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "ErrorDisplay",
    component: () =>
      import(
        /*  webpackChunkName: "ErrorDisplay" */
        "../views/NotFound/ErrorDisplay"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to) {
      return {
        top: 0,
      };
    }
  },
});

export default router;
