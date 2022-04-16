import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () => import("@/components/HomePage/MainPage"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
