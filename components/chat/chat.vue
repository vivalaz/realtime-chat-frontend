<template>
  <div class="chat">
    <header>
      <div class="user-info">
        <template v-if="activeChat">
          <div class="name">
            {{ activeChat.with.displayName }}
          </div>
          <div v-if="onlineUsers.includes(activeChat.with.id)" class="status">
            Онлайн
          </div>
        </template>
      </div>

      <NuxtLink to="/" class="close-chat-button">
        Закрыть чат
      </NuxtLink>
    </header>

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
import { mapGetters, mapState } from 'vuex'
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
  computed: {
    ...mapState('chat', [
      'onlineUsers'
    ]),
    ...mapGetters('chat', [
      'getActiveChatInfo'
    ]),

    activeChat () {
      return this.getActiveChatInfo(this.$route.params.chat)
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

    this.socket.on('chat::receive-message', async (data) => {
      this.isTyping = false

      await this.$store.dispatch('chat/addMessage', data)

      this.$nextTick(() => {
        document.querySelector('[data-type="messages"]').scrollIntoView(false)
      })
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

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 49px;
    padding: 15px 1.875em 15px 1.875em;
    background-color: $dark-secondary-color;

    .user-info {
      display: flex;
      align-items: center;

      .name {
        color: #fff;
      }

      .status {
        margin-left: 0.5em;
        font-size: 13px;
        color: #ccc;
      }
    }

    .close-chat-button {
      border-radius: 0.3125em;
      padding: 0.5em 0.825em;
      background-color: $dark-accent-color;
      font-size: 0.8125em;
      color: #fff;
      cursor: pointer;
      text-decoration: none;
      transition: all .35s ease;

      &:hover {
        background-color: $dark-orange-color;
        color: #333;
      }
    }
  }

  footer {
    position: relative;
    padding: 0.938em 1.875em 0.938em 1.875em;

    .typing-wrapper {
      position: absolute;
      top: -2px;
      left: 2.1em;
      color: #fff;
      font-size: 14px;
    }
  }
}

</style>
