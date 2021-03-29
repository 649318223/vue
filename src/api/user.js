/*
 * @Descripttion: 用户管理接口请求
 * @version:
 * @Author: 马昭
 * @Date: 2021-01-21 00:55:57
 * @LastEditors: sch
 * @LastEditTime: 2021-03-04 15:30:45
 */
import server from "@/req/request";
/* 
用戶列表请求接口
*/
export function getUserList(data) {
  return server.request({
        method: "post",
        url: "/user/getList/",
        data
    })
}
/* 
省市区接口请求接口
*/
export function getCity(data) {
  return server.request({
        method: "post",
        url: "/cityPicker/",
        data
    })
}
/* 
获取角色
*/
export function getRole(data={}) {
  return server.request({
        method: "post",
        url: "/role/",
        data
    })
}
/* 
添加用户
*/
export function addUser(data) {
  return server.request({
        method: "post",
        url: "/user/add/",
        data
    })
}
/* 
删除用户
*/
export function deleteUser(data) {
  return server.request({
        method: "post",
        url: "/user/delete/",
        data
    })
}