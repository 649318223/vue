import router from "./index";
import {getToken} from "@/req/req";

const writename = ["/login"];

//路由守卫，路由跳转前检查token
router.beforeEach((to,from,next)=>{
    if(getToken()){
        if(to.path=="/login"){
            next();
            sessionStorage.clear();
        }else{
            next();
        }
      
    }else{
      console.log(writename.indexOf("/login") );
      if(writename.indexOf(to.path) >= 0 ){
            next();
      }else{
            next("/login");
      }
    }
  })