export const state = () => ({
  chats: [],
  messages: [],
  onlineUsers: []
})
export const getters = {
  getActiveChatInfo: state => (key) => {
    return state.chats.find(chat => chat.id === key)
  }
}
export const mutations = {
  SET_CHATS (state, payload = []) {
    state.chats = payload
  },
  SET_MESSAGES (state, payload = []) {
    state.messages = payload
  },
  PUSH_TO_MESSAGES (state, payload) {
    state.messages.push(payload)
  },
  PUSH_TO_ONLINE_USERS (state, payload) {
    if (Array.isArray(payload)) {
      state.onlineUsers.push(...payload)
    } else {
      state.onlineUsers.push(payload)
    }
  },
  REMOVE_FROM_ONLINE_USERS (state, payload) {
    const idx = state.onlineUsers.indexOf(payload)

    if (idx > -1) {
      state.onlineUsers.splice(idx, 1)
    }
  }
}
export const middleware = {}
export const actions = {
  addMessage ({ commit }, message) {
    commit('PUSH_TO_MESSAGES', message)
  },
  setOnlineUser ({ commit }, id) {
    commit('PUSH_TO_ONLINE_USERS', id)
  },
  removeOnlineUser ({ commit }, id) {
    commit('REMOVE_FROM_ONLINE_USERS', id)
  },
  async getChats ({ commit }) {
    try {
      const response = await this.$axios.$get('/chat/chats')

      if (response) {
        commit('SET_CHATS', response)
      }
    } catch (e) {
      console.error(e)
    }
  },
  async openChat ({ commit }, chatWithUserID) {
    try {
      const response = await this.$axios.post(`/chat/open-chat/${chatWithUserID}`)

      if (response && response.data) {
        commit('SET_MESSAGES', response.data)
      }

      return true
    } catch (e) {
      console.error(e)

      return false
    }
  }
}
