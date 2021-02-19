export const state = () => ({
  processing: false,
  searchQuery: '',
  contacts: [],
  error: ''
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
  },
  SET_SEARCH_ERROR (state, payload) {
    state.error = payload
  }
}
export const actions = {
  resetSearchState ({ commit }) {
    commit('SET_CONTACTS', [])
    commit('UPDATE_SEARCH_QUERY', '')
    commit('SET_SEARCH_ERROR', null)
  },
  async searchContacts ({ state, commit }) {
    try {
      commit('SET_SEARCH_ERROR', null)
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
      commit('SET_SEARCH_ERROR', e.response)
    } finally {
      commit('SET_PROCESSING_FLAG', false)
    }
  }
}
