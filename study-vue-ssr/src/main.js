import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
// })

new Vue({
  render: h => h(App)
}).$mount("#app");
