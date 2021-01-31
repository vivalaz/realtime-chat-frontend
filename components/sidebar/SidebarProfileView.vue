<template>
  <perfect-scrollbar>
    <div class="profile-editing">
      <header>
        <div class="edit-profile-btn">
          Редактировать профиль
        </div>
      </header>
      <main>
        <div class="top-heading">
          <UserAvatar :name="user.displayName" lg />

          <div>
            <div class="user-name">
              {{ user.displayName }}
            </div>
            <div class="sub-info">
              <span>
                {{ user.email }}
              </span>
            </div>
          </div>
        </div>

        <div class="additional-data">
          <div class="item">
            <div class="label">
              Дата регистрации
            </div>
            <div class="value">
              {{ user.metadata.creationTime }}
            </div>
          </div>
          <div class="item">
            <div class="label">
              Дата последней авторизации
            </div>
            <div class="value">
              {{ user.metadata.lastSignInTime }}
            </div>
          </div>
        </div>
      </main>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import UserAvatar from '~/components/user/UserAvatar'

export default {
  name: 'SidebarSettingsView',
  components: {
    UserAvatar,
    PerfectScrollbar
  },
  computed: {
    user () {
      return this.$store.state.auth.user
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

    .top-heading {
      display: flex;
      align-items: center;

      .user-name {
        margin-bottom: 5px;
        font-size: 17px;
        font-weight: 500;
        color: #fff;
      }

      .sub-info {
        font-size: 14px;
        color: #556089;
      }
    }

    .additional-data {
      margin-top: 30px;

      .item {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        .label {
          margin-bottom: 5px;
          color: #bfbfbf;
          font-size: 14px;
        }
        .value {
          color: $primary-text-color;
          font-size: 15px;
        }
      }
    }
  }
}

</style>
