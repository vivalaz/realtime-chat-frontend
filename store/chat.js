export const state = () => ({
  chats: [],
  messages: []
})
export const mutations = {
  SET_CHATS (state, payload = []) {
    state.chats = payload
  },
  SET_MESSAGES (state, payload = []) {
    state.messages = payload
  },
  PUSH_TO_MESSAGES (state, payload) {
    state.messages.push(payload)
  }
}
export const middleware = {}
export const actions = {
  addMessage ({ commit }, message) {
    commit('PUSH_TO_MESSAGES', message)
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
  async createChat (_, id) {
    try {
      const response = await this.$axios.post(`/chat/create-chat-with/${id}`)

      if (response && response.data && response.data.id) {
        this.$router.push(`/${response.data.id}`)
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
