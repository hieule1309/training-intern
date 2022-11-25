import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/reset.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass, faXmark, faCloudArrowUp);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
