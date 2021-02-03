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
        <edit-user-profile v-if="isEditMode" @onEdit="closeEditMode" />
        <user-profile v-else />
      </main>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import UserProfile from '~/components/sidebar/user/UserProfile'
import EditUserProfile from '~/components/sidebar/user/EditUserProfile'

export default {
  name: 'SidebarSettingsView',
  components: {
    EditUserProfile,
    UserProfile,
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

$primary-text-color: #5f6fa2;
$dark-orange-color: #ffb965;

.profile-editing {
  header {
    display: flex;
    justify-content: flex-end;
    padding: 10px 15px 0 0;

    .edit-profile-btn {
      font-size: 13px;
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
    padding: 25px 15px 0 15px;
    z-index: 1;
  }
}

</style>
