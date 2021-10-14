//导入axios
import axios from "axios";
//导出
export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 10000
  })

  //2.拦截器
  // 请求拦截
  // instance.interceptors.request.use(config => {
  //   // console.log(config);
  //   // 使用场景1.config中一些信息不符合服务器要求
  //   //        2.比如每次发送请求时，中间转圈
  //   //        3.某些请求比如登录(token)，必须携带一些特殊的信息
  //   //别忘了用完放行config！！！
  //   return config
  // },err => {
  //   // console.log(err);
  // })
  // //响应拦截
  // instance.interceptors.use(res => {
  //   // console.log(res);
  //   //用完记得还！！！但是可以只还res.data
  //   return res.data
  // },err => {
  //   // console.log(err);
  // })
  //3.发送真正的网络请求
  return instance(config)
}