<template>
  <div class="chat-message-send">
    <textarea
      v-model="message"
      class="message-input"
      placeholder="Введите сообщение..."
      @keypress="typing"
    />

    <SmartButton :disabled="!message" @click.native="sendMessage">
      Отправить
    </SmartButton>
  </div>
</template>

<script>
import debouncer from '~/plugins/debouncer'

export default {
  name: 'SendMessageContainer',
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
    typing ($event) {
      if ($event.keyCode === 13 || $event.key === 'Enter') {
        $event.preventDefault()

        this.sendMessage()

        return true
      } else {
        this.socket.emit('chat::typing')
        this.cancelTyping()
      }
    },
    cancelTyping: debouncer(function () {
      this.socket.emit('chat::cancel-typing')
    }, 3000),
    sendMessage () {
      this.socket.emit('chat::send-message', this.message)

      this.message = ''
      this.cancelTyping()
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

  .smart-button {
    width: auto;
    padding: 0.625em 0.938em;
    border-radius: 0 0.125em 0.125em 0;
  }
}
</style>
