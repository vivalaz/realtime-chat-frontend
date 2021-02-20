<template>
  <perfect-scrollbar>
    <div class="search-contacts-view">
      <header>
        <InputWithLabel
          v-model="query"
          placeholder="Вводите email контакта"
          @input="onSearchContacts"
        />
      </header>
      <main v-if="!error">
        <DialogItem
          v-for="contact in contacts"
          :key="contact.id"
          small
          :avatar="contact.photoURL"
          :name="contact.name"
          :message="contact.email"
          @click.native="startChatWithContact(contact.id)"
        />
      </main>

      <ServerErrorNotification v-else :data="error" />
    </div>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapState, mapMutations, mapActions } from 'vuex'
import debouncer from '~/plugins/debouncer'

export default {
  name: 'SidebarSearchContactsView',
  components: {
    PerfectScrollbar
  },
  props: {
    userSocket: {
      required: false,
      default: null,
      type: Object
    }
  },
  computed: {
    ...mapState('search-contacts', [
      'contacts',
      'error'
    ]),
    query: {
      get () {
        return this.$store.state['search-contacts'].searchQuery
      },
      set (value) {
        this.UPDATE_SEARCH_QUERY(value)
      }
    }
  },
  destroyed () {
    this.resetSearchState()
  },
  methods: {
    ...mapActions('search-contacts', [
      'resetSearchState',
      'searchContacts'
    ]),
    ...mapMutations('search-contacts', [
      'UPDATE_SEARCH_QUERY'
    ]),
    onSearchContacts: debouncer(function () {
      return this.searchContacts()
    }, process.env.debounceTimeout),
    startChatWithContact (id) {
      if (this.userSocket) {
        this.userSocket.emit('user::create-new-chat', id)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.search-contacts-view {
  header {
    padding: 0.938em 0.938em 0 0.938em;
  }
}

</style>
