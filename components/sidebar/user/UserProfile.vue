<template>
  <div class="user-profile">
    <div class="top-heading">
      <EditableUserAvatar :name="user.displayName" :src="user.photoURL" lg />

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
import EditableUserAvatar from '~/components/ui/EditableUserAvatar'

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

.user-profile {
  .top-heading {
    display: flex;
    align-items: center;

    .user-name {
      margin-bottom: 0.313em;
      font-size: 1.063em;
      font-weight: 500;
      color: #fff;
    }

    .sub-info {
      font-size: 0.875em;
      color: #556089;
    }
  }

  .additional-data {
    margin-top: 1.875em;

    .item {
      margin-bottom: 0.625em;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        margin-bottom: 0.313em;
        color: #bfbfbf;
        font-size: 0.875em;
      }
      .value {
        color: $primary-text-color;
        font-size: 0.938em;
      }
    }
  }
}
</style>
