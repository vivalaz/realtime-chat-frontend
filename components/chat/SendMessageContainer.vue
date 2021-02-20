<template>
  <div class="chat-message-send">
    <NewMessage v-if="!messageId" :socket="socket" />
    <EditMessage v-else :socket="socket" />
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'SendMessageContainer',
  props: {
    socket: {
      required: false,
      default: null,
      type: Object
    }
  },
  computed: {
    ...mapState('edit-message', [
      'messageId'
    ])
  }
}
</script>

<style lang="scss">

.chat-message-send {
  width: 100%;

  div {
    display: flex;
    width: 100%;
  }

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
