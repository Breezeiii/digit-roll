import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import DigitRoll from "@/components";
Vue.use(DigitRoll, { math: "floor" ,duration:2000});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
