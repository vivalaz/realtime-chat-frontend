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
  },
  SET_CONTACTS (state, payload) {
    state.contacts = payload
  }
}
export const actions = {
  resetSearchState ({ commit }) {
    commit('SET_CONTACTS', [])
    commit('UPDATE_SEARCH_QUERY', '')
  },
  async searchContacts ({ state, commit }) {
    try {
      commit('SET_PROCESSING_FLAG', true)

      const response = await this.$axios.get('/user', {
        params: {
          query: state.searchQuery
        }
      })

      if (response && response.data) {
        commit('SET_CONTACTS', response.data)
      }
    } catch (e) {

    } finally {
      commit('SET_PROCESSING_FLAG', false)
    }
  }
}
