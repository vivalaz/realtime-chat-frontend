<template>
  <div class="chat-message-send">
    <header>
      <user-avatar :src="user.photoURL" :name="user.displayName" lg />

      <textarea v-model="message" class="message-input" placeholder="Введите сообщение..." />
    </header>

    <footer>
      <chat-button :disabled="!message" @click.native="sendMessage">
        Отправить
      </chat-button>
    </footer>
  </div>
</template>

<script>
import ChatButton from '~/components/ChatButton'
import UserAvatar from '~/components/user/UserAvatar'
export default {
  name: 'ChatMessageInput',
  components: { UserAvatar, ChatButton },
  data () {
    return {
      message: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async sendMessage () {
      await this.$axios.post(`/chat/temp-send/${this.$route.params.chat}`, {
        message: this.message,
        id: this.$route.params.chat
      })

      this.message = ''
    }
  }
}
</script>

<style scoped lang="scss">
  .chat-message-send {
    width: 100%;
    padding: 15px 30px;

    header {
      display: flex;
      margin-bottom: 15px;

      .message-input {
        border: none;
        outline: none;
        resize: none;
        border-radius: 5px;
        width: 100%;
        padding: 10px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 15px;
      }
    }

    footer {
      display: flex;
      justify-content: flex-end;

      .chat-button {
        width: auto;
        padding: 10px 15px;
      }
    }
  }
</style>
