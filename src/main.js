/* import "vuetify/styles"; */
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/* import vuetify from "./plugins/vuetify"; */
import { loadFonts } from "./plugins/webfontloader";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@/assets/styles/style.scss";
import "nprogress/nprogress.css";

loadFonts();

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(store).use(vuetify).mount("#app");
