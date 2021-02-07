<template>
  <perfect-scrollbar>
    <div class="chat-messages">
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
  name: 'Messages',
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
  methods: {
    getDate (timestamp) {
      return this.$dateFns.formatRelative(timestamp, new Date())
    }
  }
}
</script>

<style scoped lang="scss">

$dark-accent-color: #282a36;
$dark-secondary-color: #44475b;
$speech-arrow-size: 9px;

.chat-messages {
  padding: 15px 30px;

  .chat-message {
    position: relative;
    display: inline-block;
    max-width: 80%;
    padding: 5px 10px;
    color: #fff;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      width: 0;
      height: 0;
    }

    .data {
      font-size: 14px;
      color: #e7ebf0;
    }

    footer {
      text-align: right;

      .time {
        font-size: 11px;
        font-weight: 700;
        color: #535f89;
      }
    }

    &--wrapper {
      display: flex;
      margin: 5px 0;

      &.my-message {
        justify-content: flex-end;

        .chat-message {
          border-radius: 5px 0 5px 5px;
          background-color: $dark-secondary-color;

          &:before {
            right: -$speech-arrow-size;
            border-top: $speech-arrow-size solid $dark-secondary-color;
            border-right: $speech-arrow-size solid transparent;
          }
        }
      }
      &.not-my-message {
        .chat-message {
          border-radius: 0 5px 5px 5px;
          background-color: $dark-accent-color;

          &:before {
            left: -$speech-arrow-size;
            border-top: $speech-arrow-size solid $dark-accent-color;
            border-left: $speech-arrow-size solid transparent;
          }
        }
      }
    }
  }
}

</style>
