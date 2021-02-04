<template>
  <perfect-scrollbar>
    <div class="search-contacts-view">
      <header>
        <InputWithLabel
          v-model="query"
          placeholder="Вводите email контакта"
        />
      </header>

      <main>
        <DialogItem />
        <DialogItem />
        <DialogItem />
        <DialogItem />
      </main>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mapMutations } from 'vuex'

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
    ])
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
