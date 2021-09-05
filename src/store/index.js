import { createStore } from 'vuex'
import usersAPI from './../apis/users.js'

export default createStore({
  // 類似 data，但在所有 component 都能讀取
  state: {
    currentUser: {
      id: -1,
      name: "",
      email: "",
      avatar: "",
    },
    isAuthenticated: false,
    token: "",
  },

  // 用來修改 state 的方法
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ""
      localStorage.removeItem('token')
    },
  },

  // 透過 API 請求資料
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        if (data.status === "error") {
          throw new Error(data.message)
        }

        const { id, name, email, avatar } = data

        commit('setCurrentUser', {
          id,
          name,
          email,
          avatar,
        })

        return true
      } catch (error) {
        console.log("Error: ", error);
        // 驗證失敗的話觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')
        return false
      }
    }
  },

  modules: {
  }
})
