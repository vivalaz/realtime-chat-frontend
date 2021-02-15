<template>
  <perfect-scrollbar>
    <div class="dialogs-wrapper">
      <div v-if="!chats.length" class="empty-sidebar">
        У Вас нет активных чатов!
      </div>

      <template v-else>
        <DialogItem
          v-for="chat in chats"
          :key="chat.id"
          :avatar="chat.with.photoURL"
          :name="chat.with.displayName"
          :message="chat.lastMessage || '-'"
          :active="isActiveDialog(chat.id)"
          :time="chat.timestamp"
          :online="onlineUsers.includes(chat.with.id)"
          @click.native="startChatWithContact(chat.id)"
        />
      </template>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapState, mapActions } from 'vuex'
import DialogItem from '~/components/sidebar/DialogItem'

export default {
  name: 'SidebarDialogView',
  components: {
    DialogItem,
    PerfectScrollbar
  },
  props: {
    socket: {
      required: false,
      default: null,
      type: Object
    }
  },
  computed: {
    ...mapState('chat', [
      'chats',
      'onlineUsers'
    ])
  },
  beforeMount () {
    this.$store.dispatch('chat/getChats')

    this.socket.on('user::user-online', this.setOnlineUser)
    this.socket.on('user::user-offline', this.removeOnlineUser)
  },
  methods: {
    ...mapActions('chat', [
      'setOnlineUser',
      'removeOnlineUser'
    ]),
    isActiveDialog (id) {
      return this.$route.params.chat === id
    },
    startChatWithContact (id) {
      this.$router.push(`/${id}`)
    }
  }
}
</script>

<style scoped lang="scss">

.dialogs-wrapper {
  padding: 0.625em;
}

</style>
