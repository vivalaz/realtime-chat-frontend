<template>
  <div class="user-profile">
    <div class="top-heading">
      <EditableUserAvatar :name="user.displayName" lg />

      <div>
        <div class="user-name">
          {{ user.displayName || 'НЛО' }}
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
          Телефон
        </div>
        <div class="value">
          <template v-if="user.data && user.data.phone">
            {{ user.data.phone }}
          </template>
          <template v-else>
            -
          </template>
        </div>
      </div>
      <div class="item">
        <div class="label">
          О себе
        </div>
        <div class="value">
          <template v-if="user.data && user.data.description">
            {{ user.data.description }}
          </template>
          <template v-else>
            -
          </template>
        </div>
      </div>
      <div class="item">
        <div class="label">
          Дата регистрации
        </div>
        <div class="value">
          {{ getHumanReadableDate(user.metadata.creationTime) }}
        </div>
      </div>
      <div class="item">
        <div class="label">
          Дата последней авторизации
        </div>
        <div class="value">
          {{ getHumanReadableDate(user.metadata.lastSignInTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditableUserAvatar from '~/components/user/EditableUserAvatar'

export default {
  name: 'UserProfile',
  components: {
    EditableUserAvatar
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    getHumanReadableDate (date) {
      if (!date) {
        return null
      }

      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    }
  }
}
</script>

<style scoped lang="scss">

$primary-text-color: #5f6fa2;

.user-profile {
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
</style>
