import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = state.cartList.find(item => item.id === payload.id)
      if (oldProduct) {
        commit(ADD_COUNTER, oldProduct);
        resolve('当前商品+1')
      } else {
        payload.count = 1;
        payload.checked = true;
        commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}