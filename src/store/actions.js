import {
  ADD_COUNTER,
  ADD_NEW_CART
}from './mutation-types'

export default {
  addCart(context,payload) {

    return new Promise((resolve,reject) => {
    //查找这个商品是否已存在
    //1.遍历方法 <<-- mutations注释里
    //2.find方法
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    //根据是否已有，进行不同操作
    if(oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
      resolve('当前商品数量+1')
    }else {
      payload.count = 1
      context.commit(ADD_NEW_CART, payload)
      resolve('添加了新的商品')
    }
    })
  }
}