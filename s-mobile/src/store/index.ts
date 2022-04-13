import { createStore } from 'vuex'
import { BuyCommodity, Commodity, Address, OrderState } from '../types'
import api from '../api'

export type Store = {
  title: string;
  distributor: string;
  commodity: {
    loaded: boolean;
    list: Commodity[];
  };
  user: Address;
  order: {
    commoditiesPrice: number;
    fare: number;
    total: number;
    commodities: BuyCommodity[];
  }
}

const store = createStore<Store>({
  state () {
    return {
      title: '万顺丰建材配送商城',
      distributor: '',
      commodity: {
        loaded: false,
        list: [],
      },
      user: {
        phone: '',
        name: '',
        address: '',
        remarks: '',
      },
      order: {
        commoditiesPrice: 0,
        fare: 0,
        total: 0,
        commodities: [],
      },
    }
  },
  mutations: {
    distributor (state, code: string) {
      state.distributor = code || ''
    },
    initCommodityList (state, list) {
      state.commodity.loaded = true
      state.commodity.list = list
    },
    addToCart (state, { count, commodity, flush }) {
      const item = state.order.commodities.find(({ id: i }) => i === commodity.id)
      if (item) {
        item.buyCount = flush ? count : (item.buyCount + count)
        item.buyCount = Math.max(1, item.buyCount)
      } else {
        state.order.commodities.push({ buyCount: Math.max(1, count), ...commodity })
      }
      let totalPrice = 0
      let totalFare = 0
      state.order.commodities.forEach(({ price, fare, buyCount }) => {
        totalPrice += buyCount * price
        totalFare += buyCount * fare
      })
      state.order.commoditiesPrice = parseFloat(totalPrice.toFixed(2))
      state.order.fare = parseFloat(totalFare.toFixed(2))
      state.order.total = parseFloat((totalPrice + totalFare).toFixed(2))
    },
    removeFromCart (state, id) {
      const index = state.order.commodities.findIndex(({ id: i }) => i === id)
      if (index > -1) {
        const del = state.order.commodities.splice(index, 1)
        del.forEach((item) => {
          const dcp = parseFloat((item.buyCount * item.price).toFixed(2))
          const df = parseFloat((item.buyCount * item.fare).toFixed(2))
          state.order.commoditiesPrice -= dcp
          state.order.fare -= df
          state.order.total -= (dcp + df)
        })
      }
    },
    clearCart (state) {
      state.order.total = 0
      state.order.fare = 0
      state.order.commoditiesPrice = 0
      state.order.commodities = []
    },
    phone (state, phone) {
      state.user.phone = phone
    },
    user (state, info) {
      state.user = { ...state.user, ...info }
    },
  },
  actions: {
    async init ({ commit, state }) {
      if (!state.commodity.loaded) {
        const data = await api.getCommodityList()
        commit('initCommodityList', data)
        const userInfo = await api.getUserAddress(state.user.phone)
        if (userInfo) {
          commit('user', userInfo)
        }
      }
    },
    submitOrder ({ state }) {
      return new Promise((res, rej) => {
        api
          .submitOrder({
            id: 0,
            code: '',
            state: OrderState.PRE_PAY,
            phone: state.user.phone,
            name: state.user.name,
            address: state.user.address,
            remarks: state.user.remarks,
            farePrice: state.order.fare,
            commoditiesPrice: state.order.commoditiesPrice,
            total: state.order.total,
            distributor: state.distributor,
            commodities: state.order.commodities,
          })
          .then((data) => {
            res(1)
          })
      })
    },
  },
})

export default store
