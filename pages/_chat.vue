<template>
  <Chat />
</template>

<script>
import Chat from '~/components/chat/chat'

export default {
  components: { Chat },
  middleware: ['auth', 'chatable-id']
}
</script>
