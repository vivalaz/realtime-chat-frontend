<template>
  <div
    class="dialog-item"
    :class="{
      'dialog-item--active': active,
      'dialog-item--small': small
    }"
  >
    <div class="avatar">
      <UserAvatar :src="avatar" :name="name" :online="online" />
    </div>

    <div class="data">
      <div class="name">
        {{ name || 'НЛО' }}
      </div>
      <div v-if="message" class="preview">
        {{ message }}
      </div>

      <div v-if="time" class="time">
        {{ getDate(time) }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DialogItem',
  props: {
    active: Boolean,
    small: Boolean,
    avatar: {
      required: false,
      default: null,
      type: String
    },
    name: {
      required: false,
      default: null,
      type: String
    },
    message: {
      required: false,
      default: null,
      type: String
    },
    time: {
      required: false,
      default: null,
      type: Number
    },
    online: Boolean
  },
  methods: {
    getDate (timestamp) {
      return this.$dateFns.formatRelative(timestamp, new Date())
    }
  }
}
</script>

<style scoped lang="scss">

.dialog-item {
  position: relative;
  display: flex;
  margin-top: 0.313em;
  width: 100%;
  padding: 0.6em 0.938em;
  border-radius: 0.313em;
  background-color: $dark-accent-color;
  cursor: pointer;
  transition: background-color .35s ease;

  &:first-child {
    margin-top: 0;
  }

  &:hover:not(&--active) {
    background-color: $dark-secondary-color;
  }

  .data {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    .name {
      margin-bottom: 0.313em;
      color: #fff;
      font-weight: 500;
    }

    .preview {
      font-size: 0.813em;
      color: #556089;
      font-weight: 500;
    }

    .time {
      position: absolute;
      top: -7px;
      right: 0;
      font-size: 0.688em;
      font-weight: 400;
      color: #535f89;
    }
  }

  &--active {
    background: $blue-gradient;
    cursor: default;

    .data {
      .name,
      .preview,
      .time {
        color: #fff;
      }
    }
  }

  &--small {
    padding: 0.5em 0.938em;
  }
}

</style>
