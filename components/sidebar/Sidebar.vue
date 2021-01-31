<template>
  <div class="sidebar">
    <sidebar-dialog-view v-if="isDialogsVisible" />
    <sidebar-profile-view v-else />

    <footer class="sidebar-footer">
      <div v-if="isDialogsVisible" class="sidebar-footer-button" @click="showProfile">
        Профиль
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
import SidebarProfileView from '~/components/sidebar/SidebarProfileView'

export default {
  name: 'Sidebar',
  components: { SidebarProfileView, SidebarDialogView },
  data () {
    return {
      isDialogsVisible: true
    }
  },
  methods: {
    showProfile () {
      this.isDialogsVisible = false
    },
    showDialogs () {
      this.isDialogsVisible = true
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
$dark-accent-color: #282a36;
$dark-secondary-color: #44475b;
$dark-blue-color: #578ec9;

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 20%;
  min-width: 320px;
  height: 100%;
  background-color: $dark-accent-color;
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
      background-color: $dark-secondary-color;
      font-size: 14px;
      cursor: pointer;
      transition: background .35s ease;

      &:hover {
        background: $dark-blue-color;
      }
    }
  }
}

</style>
