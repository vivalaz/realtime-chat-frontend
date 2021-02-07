<template>
  <pre>{{ messages }}</pre>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Messages',
  computed: {
    ...mapState('chat', [
      'messages'
    ])
  }
}
</script>

<style scoped>

</style>
