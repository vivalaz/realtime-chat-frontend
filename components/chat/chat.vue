<template>
  <div class="chat">
    <Messages />

    <ChatMessageSend />
  </div>
</template>

<script>
import ChatMessageSend from '~/components/chat/ChatMessageSend'
import Messages from '~/components/chat/Messages'
export default {
  name: 'Chat',
  components: { Messages, ChatMessageSend }
}
</script>

<style scoped lang="scss">

.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: $dark-accent-color;
}

</style>
