import Vue from "vue";
//import VueCompositionApi from '@vue/composition-api'; 
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./store";
import "./iocn";
import "./router/app";
import global from "./req/global";


//Vue.use(VueCompositionApi);
Vue.use(ElementUI);
//全局组件
Vue.use(global);
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
