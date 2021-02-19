<template>
  <perfect-scrollbar>
    <div class="profile-editing">
      <header>
        <div class="edit-profile-btn" @click="toggleEditMode">
          <template v-if="isEditMode">
            Отменить редактирование
          </template>
          <template v-else>
            Редактировать профиль
          </template>
        </div>
      </header>
      <main>
        <EditUserProfile v-if="isEditMode" @onEdit="closeEditMode" />
        <UserProfile v-else />
      </main>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  name: 'SidebarSettingsView',
  components: {
    PerfectScrollbar
  },
  data () {
    return {
      isEditMode: false
    }
  },
  methods: {
    toggleEditMode () {
      this.isEditMode = !this.isEditMode
    },
    closeEditMode (user) {
      this.$auth.setUser(user)
      this.isEditMode = false
    }
  }
}
</script>

<style scoped lang="scss">

.profile-editing {
  header {
    display: flex;
    justify-content: flex-end;
    padding: 0.625em 0.938em 0 0;

    .edit-profile-btn {
      font-size: 0.813em;
      color: $primary-text-color;
      font-weight: 500;
      cursor: pointer;
      transition: color .35s ease;

      &:hover {
        color: $dark-orange-color;
      }
    }
  }

  main {
    position: relative;
    padding: 25px 0.938em 0 0.938em;
    z-index: 1;
  }
}

</style>
