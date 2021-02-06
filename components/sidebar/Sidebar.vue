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

    <sidebar-dialog-view v-if="isDialogsVisible" />
    <sidebar-profile-view v-else-if="isProfileVisible" />
    <sidebar-search-contacts-view v-else-if="isSearchContactVisible" />

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
import SidebarDialogView from '~/components/sidebar/SidebarDialogView'
import SidebarProfileView from '~/components/sidebar/SidebarProfileView'
import SidebarSearchContactsView from '~/components/sidebar/SidebarSearchContactsView'

export default {
  name: 'Sidebar',
  components: { SidebarSearchContactsView, SidebarProfileView, SidebarDialogView },
  computed: {
    ...mapGetters('sidebar', [
      'isDialogsVisible',
      'isProfileVisible',
      'isSearchContactVisible'
    ])
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

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>

<style lang="scss">

$sidebar-header-height: 30px;
$sidebar-footer-height: 45px;
$dark-accent-color: #282a36;
$dark-secondary-color: #44475b;
$dark-blue-color: #578ec9;

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
  width: 20%;
  min-width: 320px;
  height: 100%;
  background-color: $dark-accent-color;
  overflow: hidden;

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
      font-size: 13px;
      @include sidebarButtonStyle();
    }
  }

  &-footer {
    position: relative;
    display: flex;
    height: $sidebar-footer-height;
    width: 100%;
    box-shadow: 0 0 27px 1px rgba(34, 45, 56, 1);

    .sidebar-footer-button {
      width: 50%;
      height: 100%;
      font-size: 14px;
      @include sidebarButtonStyle();
    }
  }
}

</style>
