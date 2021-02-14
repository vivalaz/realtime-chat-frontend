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
          :online="idsOfOnlineUsers.includes(chat.with.id)"
          @click.native="startChatWithContact(chat.id)"
        />
      </template>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapState } from 'vuex'
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
  data () {
    return {
      idsOfOnlineUsers: []
    }
  },
  computed: {
    ...mapState('chat', [
      'chats'
    ])
  },
  beforeMount () {
    this.$store.dispatch('chat/getChats')

    this.socket.on('user::user-online', (id) => {
      this.idsOfOnlineUsers.push(id)
    })
    this.socket.on('user::user-offline', (id) => {
      const idx = this.idsOfOnlineUsers.indexOf(id)

      if (idx > -1) {
        this.idsOfOnlineUsers.splice(idx, 1)
      }
    })
  },
  methods: {
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
