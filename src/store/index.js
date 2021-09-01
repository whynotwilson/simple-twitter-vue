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
  },

  // 用來修改 state 的方法
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      }
      state.isAuthenticated = true
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

      } catch (error) {
        console.log("Error: ", error);
      }
    }
  },

  modules: {
  }
})
