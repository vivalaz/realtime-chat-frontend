<template>
  <perfect-scrollbar>
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
        @click.native="startChatWithContact(chat.id)"
      />
    </template>
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
  computed: {
    ...mapState('chat', [
      'chats'
    ])
  },
  beforeMount () {
    this.$store.dispatch('chat/getChats')
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
