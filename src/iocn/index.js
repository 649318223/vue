import Vue from "vue";
import svgiocn from "./SvgIocn";

Vue.component("svg-iocn",svgiocn);

//遍历SVG包下的文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
