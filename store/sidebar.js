export const state = () => ({
  settingsViewVisibility: false
})

export const mutations = {
  SET_SETTINGS_VISIBILITY_FLAG (state, flag) {
    state.settingsViewVisibility = flag
  }
}

export const actions = {
  showSettingsView ({ commit }) {
    commit('SET_SETTINGS_VISIBILITY_FLAG', true)
  },
  showDialogsView ({ commit }) {
    commit('SET_SETTINGS_VISIBILITY_FLAG', false)
  }
}
