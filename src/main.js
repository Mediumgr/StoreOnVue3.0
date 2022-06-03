import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";
import "@/assets/styles/style.scss";
import "nprogress/nprogress.css";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

/* import firebase from "firebase/compat/app";
import database from "firebase/compat/database"; */
app.use(store).use(router).mount("#app");

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
