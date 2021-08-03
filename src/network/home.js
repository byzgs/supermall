import { request } from "./request";
//目的：松耦合
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}