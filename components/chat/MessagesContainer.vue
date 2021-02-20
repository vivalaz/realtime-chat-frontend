<template>
  <perfect-scrollbar>
    <div data-type="messages" class="chat-messages">
      <div
        v-for="message in messages"
        :key="message.updatedAt || message.timestamp"
        class="chat-message--wrapper"
        :class="{
          'my-message': user.uid === message.senderId,
          'not-my-message': user.uid !== message.senderId,
          'selected': selectedMessages.includes(message.id)
        }"
        @click="selectMessage(message.id)"
      >
        <div class="chat-message">
          <div class="data">
            {{ message.message }}
          </div>
          <footer>
            <div class="time">
              <template v-if="message.updatedAt">
                изменено {{ getDate(message.updatedAt) }}
              </template>
              <template v-else>
                {{ getDate(message.timestamp) }}
              </template>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  name: 'MessagesContainer',
  components: {
    PerfectScrollbar
  },
  computed: {
    ...mapState('chat', [
      'messages',
      'selectedMessages'
    ]),
    user () {
      return this.$store.state.auth.user
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelector('[data-type="messages"]').scrollIntoView(false)
    })
  },
  methods: {
    ...mapActions('chat', [
      'selectMessage'
    ]),
    getDate (timestamp) {
      return this.$dateFns.formatRelative(timestamp, new Date())
    }
  }
}
</script>

<style scoped lang="scss">

.ps {
  height: calc(100% - #{$chat-header-height});
}

.chat-messages {
  padding: 0.938em 1.875em 0 1.875em;

  .chat-message {
    position: relative;
    display: inline-block;
    max-width: 80%;
    padding: 0.313em 0.625em;
    color: #fff;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      width: 0;
      height: 0;
    }

    .data {
      font-size: 0.875em;
      color: #e7ebf0;
    }

    footer {
      text-align: right;

      .time {
        font-size: 0.688em;
        color: #c7c7c7;
      }
    }

    &--wrapper {
      display: flex;
      margin: 0.313em 0;
      border-radius: 0.125em;
      cursor: pointer;

      &.my-message {
        justify-content: flex-end;

        .chat-message {
          border-radius: 0.313em 0 0.313em 0.313em;
          background: $blue-gradient;

          &:before {
            right: -$speech-arrow-size;
            border-top: $speech-arrow-size solid $dark-blue-color;
            border-right: $speech-arrow-size solid transparent;
          }
        }
      }
      &.not-my-message {
        .chat-message {
          border-radius: 0 0.313em 0.313em 0.313em;
          background-color: $dark-secondary-color;

          &:before {
            left: -$speech-arrow-size;
            border-top: $speech-arrow-size solid $dark-secondary-color;
            border-left: $speech-arrow-size solid transparent;
          }
        }
      }
      &.selected {
        background-color: rgba(#fff, .02);

        .chat-message {
          opacity: .8;
        }
      }
    }
  }
}

</style>
