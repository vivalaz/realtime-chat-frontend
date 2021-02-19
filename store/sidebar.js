export const state = () => ({
  PROFILE_VIEW: 'profile',
  DIALOGS_VIEW: 'dialogs',
  SEARCH_CONTACT_VIEW: 'search-contacts',
  selectedView: 'dialogs'
})
export const getters = {
  selectedViewIs (state) {
    return key => state.selectedView === key
  },
  isDialogsVisible (state, getters) {
    return getters.selectedViewIs(state.DIALOGS_VIEW)
  },
  isProfileVisible (state, getters) {
    return getters.selectedViewIs(state.PROFILE_VIEW)
  },
  isSearchContactVisible (state, getters) {
    return getters.selectedViewIs(state.SEARCH_CONTACT_VIEW)
  }
}
export const mutations = {
  SET_VIEW (state, payload) {
    state.selectedView = payload
  }
}
export const actions = {
  showProfile ({ state, commit }) {
    commit('SET_VIEW', state.PROFILE_VIEW)
  },
  showDialogs ({ state, commit }) {
    commit('SET_VIEW', state.DIALOGS_VIEW)
  },
  showSearchContacts ({ state, commit }) {
    commit('SET_VIEW', state.SEARCH_CONTACT_VIEW)
  }
}
