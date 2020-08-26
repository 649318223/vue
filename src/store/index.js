import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import head from "./head.js"

export default new Vuex.Store({
  modules : {
    head
  }
});
