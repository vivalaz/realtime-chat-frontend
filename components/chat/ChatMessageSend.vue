<template>
  <div class="chat-message-send">
    <textarea v-model="message" class="message-input" placeholder="Введите сообщение..." />

    <chat-button :disabled="!message" @click.native="sendMessage">
      Отправить
    </chat-button>
  </div>
</template>

<script>
import ChatButton from '~/components/ChatButton'
export default {
  name: 'ChatMessageInput',
  components: { ChatButton },
  data () {
    return {
      message: ''
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
  display: flex;
  width: 100%;
  padding: 0.938em 1.875em;

  .message-input {
    border: none;
    outline: none;
    resize: none;
    border-radius: 0.313em 0 0 0.313em;
    background-color: $dark-secondary-color;
    color: #fff;
    width: 100%;
    padding: 0.625em;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 0.938em;

    &::placeholder {
      color: #fff;
    }
  }

  .chat-button {
    width: auto;
    padding: 0.625em 0.938em;
    border-radius: 0 0.125em 0.125em 0;
  }
}
</style>
