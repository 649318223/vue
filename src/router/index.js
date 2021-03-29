import Vue from "vue";
import VueRouter from "vue-router";
import content from "../components/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden : true,
    meta : {
      name : "主页",
      iocn : "index"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden : true,
    meta : {
      name : "登陆",
      iocn : "login"
    },
    component: () =>import("../components/login/login.vue")
  },
  //控制台
  {
    path: "/index",
    name: "Index",
    meta : {
      name : "控制台",
      iocn : "console"
    },
    component:content,
    redirect: "cont",
    children : [
      {
        path: "/cont",
        name: "Cont",
        meta : {
          name : "首页"
        },
        component: () =>import("../components/index/cont.vue")
      }
    ]
  },
  //信息列表
  {
    path: "/info",
    name: "Info",
    meta : {
      name : "信息管理",
      iocn : "info"
    },
    component:content,
    children : [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta : {
          name : "信息列表"
        },
        component: () =>import("../components/info/index.vue")
      },
      {
        path: "/infoClass",
        name: "InfoClass",
        meta : {
          name : "信息分类"
        },
        component: () =>import("../components/info/infoClass.vue")
      },
      {
        path: "/infoDetails",
        name: "InfoDetails",
        meta : {
          name : "详细信息"
        },
        component: () =>import("../components/info/infoDetails.vue")
      }
    ]
  },
   //用户列表
   {
    path: "/user",
    name: "User",
    meta : {
      name : "用户管理",
      iocn : "user"
    },
    component:content,
    children : [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta : {
          name : "用户列表"
        },
        component: () =>import("../components/user/index.vue")
      }
    ]
  }
];

//解决3.0点击报错但不影响问题
const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes,
  mode:'history'
});

export default router;
