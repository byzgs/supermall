import {
  ADD_COUNTER,
  ADD_NEW_CART
}from './mutation-types'

export default {
  //mutations的目的：修改state里的状态
  //mutations里的每个方法，完成的事情尽可能单一
  /*
   addCart(state,payload) {
    //payload新添加的商品
    
    //查找这个商品是否已存在
    //1.遍历方法
    // let oldProduct = null
    // for(let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    //2.find方法
    let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    //根据是否已有，进行不同操作
    if(oldProduct) {
      oldProduct.count += 1
    }else {
      payload.count = 1
      state.cartList.push(payload)
    }
  }
  */

  //结合actions里的
  //已有的数量 +
  [ADD_COUNTER](state,payload) {
    payload.count += 1
  },
  //没有的push
  [ADD_NEW_CART](state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}