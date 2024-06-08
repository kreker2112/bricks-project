import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/global.css";
import store from "./store";

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

console.log(`Ширина вьюпорта: ${viewportWidth}px`);
console.log(`Высота вьюпорта: ${viewportHeight}px`);
console.log(window.devicePixelRatio);

createApp(App).use(router).use(store).mount("#app");
