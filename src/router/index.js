import { createRouter, createWebHashHistory } from "vue-router";
import FirstPage from "../views/FirstPage.vue";
import SecondPage from "../views/SecondPage.vue";

const routes = [
  {
    path: "/",
    name: "first-page",
    component: FirstPage,
  },
  {
    path: "/second-page",
    name: "second-page",
    component: SecondPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
