<template>
  <perfect-scrollbar>
    <div class="search-contacts-view">
      <header>
        <InputWithLabel
          v-model="query"
          placeholder="Вводите email контакта"
          @input="searchContacts"
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

      <ServerError v-else :data="error" />
    </div>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapState, mapMutations } from 'vuex'
import DialogItem from '~/components/sidebar/DialogItem'
import ServerError from '~/components/ServerError'

const debouncer = (func, wait, immediate) => {
  let timeout

  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }, wait)
    if (immediate && !timeout) {
      func.apply(context, args)
    }
  }
}

export default {
  name: 'SidebarSearchContactsView',
  components: {
    ServerError,
    DialogItem,
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
    this.$store.dispatch('search-contacts/resetSearchState')
  },
  methods: {
    ...mapMutations('search-contacts', [
      'UPDATE_SEARCH_QUERY'
    ]),
    searchContacts: debouncer(function () {
      return this.$store.dispatch('search-contacts/searchContacts')
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
