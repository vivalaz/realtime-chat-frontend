<template>
  <div class="chat">
    <Messages />

    <footer>
      <div v-if="isTyping" class="typing-wrapper">
        <span>
          Печатает...
        </span>
      </div>

      <ChatMessageSend :socket="socket" />
    </footer>
  </div>
</template>

<script>
import ChatMessageSend from '~/components/chat/ChatMessageSend'
import Messages from '~/components/chat/Messages'

export default {
  name: 'Chat',
  components: { Messages, ChatMessageSend },
  data () {
    return {
      socket: null,
      isTyping: false
    }
  },
  beforeMount () {
    this.socket = this.$nuxtSocket({
      name: 'default',
      query: {
        chat_id: this.$route.params.chat,
        user_id: this.$store.state.auth.user.uid,
        token: localStorage.getItem('auth._token.local')
      }
    })

    this.socket.on('chat::receive-message', (data) => {
      // todo if scrollTop < X scroll to end of chat
      this.$store.dispatch('chat/addMessage', data)
    })

    this.socket.on('chat::typing', () => {
      this.isTyping = true
    })
    this.socket.on('chat::cancel-typing', () => {
      this.isTyping = false
    })
  }
}
</script>

<style scoped lang="scss">

.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: $dark-accent-color;

  footer {
    padding: 0 1.875em 0.938em 1.875em;

    .typing-wrapper {
      margin-bottom: .25em;
      color: #fff;
      font-size: 14px;
    }
  }
}

</style>
