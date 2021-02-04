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
      <main>
        //todo
      </main>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapMutations } from 'vuex'

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
    PerfectScrollbar
  },
  computed: {
    query: {
      get () {
        return this.$store.state['search-contacts'].searchQuery
      },
      set (value) {
        this.UPDATE_SEARCH_QUERY(value)
      }
    }
  },
  methods: {
    ...mapMutations('search-contacts', [
      'UPDATE_SEARCH_QUERY'
    ]),
    searchContacts: debouncer(function () {
      return this.$store.dispatch('search-contacts/searchContacts')
    }, process.env.debounceTimeout),
    startChatWithContact () {

    }
  }
}
</script>

<style scoped lang="scss">

.search-contacts-view {
  header {
    padding: 15px 15px 0 15px;
  }
}

</style>
