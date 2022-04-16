import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/style.scss";
import CartOrder from "@/components/Header/CartOrder.vue";
/* import firebase from "firebase/compat/app";
import database from "firebase/compat/database"; */

const app = createApp({});

app.component("cart-order", CartOrder);

createApp(App).use(store).use(router).mount("#app");

/* firebase.initializeApp({
  apiKey: "AIzaSyBwydN0FiMzsaMGj_u0s4TeOtcqA87KIQE",
  authDomain: "vue3-be226.firebaseapp.com",
  databaseURL: "https://vue3-be226-default-rtdb.firebaseio.com",
  projectId: "vue3-be226",
  storageBucket: "vue3-be226.appspot.com",
  messagingSenderId: "503474516404",
  appId: "1:503474516404:web:f0f3692d1a947dfcd4c2e1",
  measurementId: "G-RK6CKD3QVK",
});
 */
/* export { firebase, database }; */
