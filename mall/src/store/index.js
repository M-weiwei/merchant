import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '../assets/config/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartList: [], //商品购物车列表
        cartTotal: {} //购物车总数
    },
    mutations: {
        setCartList(state, cartList) {
            state.cartList = cartList
        },
        setCartTotal(state, cartTotal) {
            state.cartTotal = cartTotal
        }
    },
    actions: {
        async AjaxCartList(content) {
            let {
                data: cartRes
            } = await axios.get(api.CartList)
            content.commit('setCartList', cartRes.data.cartList)
            content.commit('setCartTotal', cartRes.data.cartTotal)
        }
    },
    modules: {}
})