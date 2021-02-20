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
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'EditMessage',
  props: {
    socket: {
      required: false,
      default: null,
      type: Object
    }
  },
  computed: {
    ...mapState('edit-message', [
      'newMessageContent'
    ]),
    ...mapGetters('edit-message', [
      'getEditableMessage'
    ]),

    message: {
      get () {
        return this.newMessageContent
      },
      set (value) {
        this.SET_MESSAGE_CONTENT(value)
      }
    }
  },
  methods: {
    ...mapMutations('edit-message', [
      'SET_MESSAGE_CONTENT'
    ]),
    typing ($event) {
      if ($event.keyCode === 13 || $event.key === 'Enter') {
        $event.preventDefault()

        this.sendMessage()

        return true
      }
    },
    sendMessage () {
      this.socket.emit('chat::edit-message', {
        id: this.getEditableMessage.id,
        message: this.message
      })
      this.message = ''
    }
  }
}
</script>
