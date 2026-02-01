import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@picocss/pico/css/pico.min.css";
import "./styles/pico-overrides.css";


createApp(App).use(router).mount("#app");
