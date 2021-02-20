export const state = () => ({
  chats: [],
  messages: [],
  onlineUsers: [],
  selectedMessages: []
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
  REMOVE_FROM_MESSAGES (state, id) {
    const idx = state.messages.findIndex(msg => msg.id === id)

    if (idx > -1) {
      state.messages.splice(idx, 1)
    }
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
  },
  SELECT_DESELECT_MESSAGE (state, id) {
    const idx = state.selectedMessages.indexOf(id)

    if (idx > -1) {
      state.selectedMessages.splice(idx, 1)
    } else {
      state.selectedMessages.push(id)
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
  selectMessage ({ commit }, messageId) {
    if (messageId) {
      commit('SELECT_DESELECT_MESSAGE', messageId)
    }
  },
  deleteMessages ({ commit }, messages = []) {
    messages.forEach((message) => {
      commit('SELECT_DESELECT_MESSAGE', message)
      commit('REMOVE_FROM_MESSAGES', message)
    })
  },
  async getChats ({ commit }) {
    try {
      const response = await this.$axios.$get('/chats')

      if (response) {
        commit('SET_CHATS', response)
      }
    } catch (e) {
      console.error(e)
    }
  },
  async openChat ({ commit }, chatWithUserID) {
    try {
      const response = await this.$axios.post(`/chats/${chatWithUserID}/open`)

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
