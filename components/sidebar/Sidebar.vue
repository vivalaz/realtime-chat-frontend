<template>
  <div class="sidebar">
    <sidebar-dialog-view v-if="dialogViewIsVisible" />
    <sidebar-settings-view v-else />

    <footer class="sidebar-footer">
      <div v-if="dialogViewIsVisible" class="sidebar-footer-button" @click="showSettings">
        Настройки
      </div>
      <div v-else class="sidebar-footer-button" @click="showDialogs">
        Диалоги
      </div>
      <div class="sidebar-footer-button" @click="logout">
        Выход
      </div>
    </footer>
  </div>
</template>

<script>
import SidebarDialogView from '~/components/sidebar/SidebarDialogView'
import SidebarSettingsView from '~/components/sidebar/SidebarSettingsView'

export default {
  name: 'Sidebar',
  components: { SidebarSettingsView, SidebarDialogView },
  computed: {
    dialogViewIsVisible () {
      return !this.$store.state.sidebar.settingsViewVisibility
    }
  },
  methods: {
    showSettings () {
      return this.$store.dispatch('sidebar/showSettingsView')
    },
    showDialogs () {
      return this.$store.dispatch('sidebar/showDialogsView')
    },
    async logout () {
      return await this.$auth.logout()
    }
  }
}
</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>

<style scoped lang="scss">

$sidebar-footer-height: 45px;

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  min-width: 320px;
  height: 100%;
  background-color: #313e4c;
  overflow: hidden;

  .ps {
    height: calc(100% - #{$sidebar-footer-height});
  }

  &-footer {
    position: relative;
    display: flex;
    height: $sidebar-footer-height;
    width: 100%;
    box-shadow: 0 0 27px 1px rgba(34, 45, 56, 1);

    .sidebar-footer-button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100%;
      color: #fff;
      font-weight: 300;
      background-color: #3e5162;
      font-size: 14px;
      cursor: pointer;
      transition: background .35s ease;

      &:hover {
        background: #578ec9;
      }
    }
  }
}

</style>
