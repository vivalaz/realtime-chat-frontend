<template>
  <div class="chat-message-send">
    <textarea v-model="message" class="message-input" placeholder="Введите сообщение..." @input="typing" />

    <chat-button :disabled="!message" @click.native="sendMessage">
      Отправить
    </chat-button>
  </div>
</template>

<script>
import ChatButton from '~/components/ChatButton'

const debouncer = (func, wait, immediate) => {
  let timeout

  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }, wait)
    if (immediate && !timeout) {
      func.apply(context, args)
    }
  }
}

export default {
  name: 'ChatMessageInput',
  components: { ChatButton },
  props: {
    socket: {
      required: false,
      default: null,
      type: Object
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    typing () {
      this.socket.emit('chat::typing')
      this.cancelTyping()
    },
    cancelTyping: debouncer(function () {
      this.socket.emit('chat::cancel-typing')
    }, 3000),
    sendMessage () {
      this.socket.emit('chat::send-message', this.message)

      this.message = ''
    }
  }
}
</script>

<style scoped lang="scss">

.chat-message-send {
  display: flex;
  width: 100%;

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
