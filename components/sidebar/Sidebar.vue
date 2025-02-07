<template>
  <div class="sidebar">
    <header class="sidebar-header">
      <div v-if="!isSearchContactVisible" class="sidebar-header-button" @click="showSearchContacts">
        Поиск контактов
      </div>
      <div v-else class="sidebar-header-button" @click="showDialogs">
        &#8592; Вернуться к чатам
      </div>
    </header>

    <SidebarDialogView v-if="isDialogsVisible" :socket="userSocket" />
    <SidebarProfileView v-else-if="isProfileVisible" />
    <SidebarSearchContactsView v-else-if="isSearchContactVisible" :user-socket="userSocket" />

    <footer class="sidebar-footer">
      <div v-if="isDialogsVisible" class="sidebar-footer-button" @click="showProfile">
        Профиль
      </div>
      <div v-else-if="isProfileVisible || isSearchContactVisible" class="sidebar-footer-button" @click="showDialogs">
        Диалоги
      </div>
      <div class="sidebar-footer-button" @click="logout">
        Выход
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Sidebar',
  data () {
    return {
      userSocket: null
    }
  },
  computed: {
    ...mapGetters('sidebar', [
      'isDialogsVisible',
      'isProfileVisible',
      'isSearchContactVisible'
    ])
  },
  beforeMount () {
    this.userSocket = this.$nuxtSocket({
      name: 'default',
      query: {
        user_id: this.$store.state.auth.user.uid,
        token: localStorage.getItem('auth._token.local')
      }
    })

    this.userSocket.on('user::created-new-chat', (id) => {
      this.$router.push(`/${id}`)
      this.showDialogs()
    })

    this.userSocket.on('user::update-chats', () => {
      this.$store.dispatch('chat/getChats')
    })
  },
  methods: {
    ...mapActions('sidebar', [
      'showProfile',
      'showDialogs',
      'showSearchContacts'
    ]),
    async logout () {
      return await this.$auth.logout()
    }
  }
}
</script>

<style lang="scss">

@mixin sidebarButtonStyle() {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $dark-secondary-color;
  font-weight: 300;
  color: #fff;
  cursor: pointer;
  transition: background .35s ease;

  &:hover {
    background: $dark-blue-color;
  }
}

.sidebar {
  position: relative;
  top: 0;
  left: 0;
  max-width: 320px;
  width: 100%;
  min-width: 320px;
  height: 100%;
  background-color: $dark-accent-color;
  border-right: 3px solid $dark-secondary-color;
  overflow: hidden;

  @media only screen and (max-width: 768px) {
    max-width: none;
  }

  .ps {
    height: calc(100% - #{$sidebar-footer-height} - #{$sidebar-header-height});
  }

  .empty-sidebar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #e7ebf0;
  }

  &-header {
    position: sticky;
    top: 0;
    left: 0;
    box-shadow: 0 0 27px 1px rgba(34, 45, 56, 1);
    &-button {
      height: $sidebar-header-height;
      font-size: 0.813em;
      @include sidebarButtonStyle();
    }
  }

  &-footer {
    position: relative;
    display: flex;
    height: $sidebar-footer-height;
    width: 100%;
    box-shadow: 0 0 1.688em 0.063em rgba(34, 45, 56, 1);

    .sidebar-footer-button {
      width: 50%;
      height: 100%;
      font-size: 0.875em;
      @include sidebarButtonStyle();
    }
  }
}

</style>
