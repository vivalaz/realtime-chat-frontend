<template>
  <Chat />
</template>

<script>
import { mapGetters } from 'vuex'
import Chat from '~/components/chat/chat'

export default {
  components: { Chat },
  middleware: ['auth', 'chatable-id'],
  head () {
    return {
      title: this.pageTitle
    }
  },
  computed: {
    ...mapGetters('chat', [
      'getActiveChatInfo'
    ]),

    activeChat () {
      return this.getActiveChatInfo(this.$route.params.chat)
    },
    pageTitle () {
      const name = this.activeChat?.with?.displayName

      return name ? `Чат с ${name}` : 'Чат'
    }
  }
}
</script>
