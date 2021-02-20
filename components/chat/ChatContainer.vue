<template>
  <div class="chat">
    <header>
      <div class="user-info">
        <template v-if="activeChat && !selectedMessages.length">
          <div class="name">
            {{ activeChat.with.displayName }}
          </div>
          <div v-if="onlineUsers.includes(activeChat.with.id)" class="status">
            Онлайн
          </div>
        </template>
        <div v-else-if="activeChat && selectedMessages.length" class="message-controls">
          <template v-if="!editMessageEnabled">
            <div class="chat-manage-button" @click="cancelSelect">
              Отмена
            </div>
            <div class="chat-manage-button" @click="deleteMessages">
              Удалить
            </div>
            <div v-if="selectedOnlyOneMessage" class="chat-manage-button" @click="editMessage">
              Редактировать
            </div>
          </template>
          <template v-else>
            <div class="chat-manage-button" @click="disableEditMode">
              Отменить редактирование
            </div>
          </template>
        </div>
      </div>

      <NuxtLink to="/" class="chat-manage-button">
        Закрыть чат
      </NuxtLink>
    </header>

    <MessagesContainer />

    <footer>
      <div v-if="isTyping" class="typing-wrapper">
        <span>
          Печатает...
        </span>
      </div>

      <SendMessageContainer :socket="socket" />
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'ChatContainer',
  data () {
    return {
      socket: null,
      isTyping: false
    }
  },
  computed: {
    ...mapState('chat', [
      'onlineUsers',
      'selectedMessages'
    ]),
    ...mapGetters('chat', [
      'getActiveChatInfo'
    ]),
    ...mapGetters('edit-message', [
      'editMessageEnabled'
    ]),

    activeChat () {
      return this.getActiveChatInfo(this.$route.params.chat)
    },
    selectedOnlyOneMessage () {
      return this.selectedMessages.length === 1
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

      await this.updateMessages(data)

      this.$webNotification.notify('Получено новое сообщение!', data)
    })

    this.socket.on('chat::message-sent', this.updateMessages)

    this.socket.on('chat::typing', () => {
      this.isTyping = true
    })
    this.socket.on('chat::cancel-typing', () => {
      this.isTyping = false
    })

    this.socket.on('chat::messages-deleted', (ids = []) => {
      this.$store.dispatch('chat/deleteMessages', ids)
    })
    this.socket.on('chat::message-edited', (message) => {
      this.$store.dispatch('chat/updateMessage', message)
      this.disableEditMode()
    })
  },
  methods: {
    ...mapActions('chat', [
      'getChats',
      'addMessage',
      'resetSelectedMessages'
    ]),
    ...mapActions('edit-message', [
      'disableEditMode',
      'activateEditMode'
    ]),
    async updateMessages (data) {
      this.getChats()
      await this.addMessage(data)

      this.$nextTick(() => {
        document.querySelector('[data-type="messages"]').scrollIntoView(false)
      })
    },
    cancelSelect () {
      return this.resetSelectedMessages()
    },
    deleteMessages () {
      this.socket.emit('chat::delete-messages', this.selectedMessages)
    },
    editMessage () {
      if (this.selectedOnlyOneMessage) {
        this.activateEditMode(this.selectedMessages[0])
      }
    }
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
    min-height: $chat-header-height;
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

    .message-controls {
      display: flex;
      align-items: center;

      .chat-manage-button:not(:last-child) {
        margin-right: .625em;
      }
    }

    .chat-manage-button {
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
