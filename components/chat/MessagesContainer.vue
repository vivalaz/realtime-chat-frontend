<template>
  <perfect-scrollbar>
    <div data-type="messages" class="chat-messages">
      <div
        v-for="message in messages"
        :key="message.timestamp"
        class="chat-message--wrapper"
        :class="{
          'my-message': user.uid === message.senderId,
          'not-my-message': user.uid !== message.senderId
        }"
      >
        <div class="chat-message">
          <div class="data">
            {{ message.message }}
          </div>
          <footer>
            <div class="time">
              {{ getDate(message.timestamp) }}
            </div>
          </footer>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { mapState } from 'vuex'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  name: 'MessagesContainer',
  components: {
    PerfectScrollbar
  },
  computed: {
    ...mapState('chat', [
      'messages'
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
    }
  }
}

</style>
