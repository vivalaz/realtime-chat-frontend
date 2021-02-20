export const state = () => ({
  messageId: null,
  newMessageContent: ''
})
export const getters = {
  getEditableMessage (state, getters, rootState) {
    return rootState.chat.messages.find(msg => msg.id === state.messageId)
  },
  editMessageEnabled (state) {
    return !!state.messageId
  }
}
export const mutations = {
  SET_EDITABLE_MESSAGE_ID (state, payload) {
    state.messageId = payload
  },
  SET_MESSAGE_CONTENT (state, payload) {
    state.newMessageContent = payload
  }
}
export const middleware = {}
export const actions = {
  activateEditMode ({ commit, getters }, messageId) {
    commit('SET_EDITABLE_MESSAGE_ID', messageId)
    commit('SET_MESSAGE_CONTENT', getters.getEditableMessage?.message)
  },
  disableEditMode ({ commit }) {
    commit('SET_EDITABLE_MESSAGE_ID', null)
    commit('SET_MESSAGE_CONTENT', '')
  }
}
