<template>
  <div>
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
  name: 'NewMessage',
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

        if (this.message) {
          this.sendMessage()
        }

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

<style scoped>

</style>
