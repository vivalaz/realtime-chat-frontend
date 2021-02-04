export const state = () => ({
  processing: false,
  searchQuery: '',
  contacts: []
})
export const mutations = {
  SET_PROCESSING_FLAG (state, flag) {
    state.processing = flag
  },
  UPDATE_SEARCH_QUERY (state, payload) {
    state.searchQuery = payload
  }
}
export const actions = {
  searchContacts ({ commit }) {
    try {
      commit('SET_PROCESSING_FLAG', true)
    } catch (e) {

    } finally {
      commit('SET_PROCESSING_FLAG', false)
    }
  }
}
