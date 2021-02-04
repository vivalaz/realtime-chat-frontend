export const state = () => ({})
export const mutations = {}
export const middleware = {}
export const actions = {
  async openChat (_, chatWithUserID) {
    try {
      await this.$axios.post(`/chat/open-chat/${chatWithUserID}`)

      return true
    } catch (e) {
      console.error(e)

      return false
    }
  }
}
