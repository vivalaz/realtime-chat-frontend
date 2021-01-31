<template>

  <div class="dialog-item" :class="{'dialog-item--active': active}">

    <div class="avatar">
      <UserAvatar :src="avatar" name="Виталий Гриневич" />
    </div>

    <div class="data">

      <div class="name">Виталий Гриневич</div>
      <div class="preview">Lorem ipsum dolor sit amet.</div>

      <div class="time">
        10:23
      </div>
    </div>

  </div>

</template>

<script>
import UserAvatar from '~/components/user/UserAvatar'

export default {
  name: 'DialogItem',
  components: { UserAvatar },
  props: {
    active: Boolean,
    avatar: {
      required: false,
      default: null,
      type: String
    }
  }
}
</script>

<style scoped lang="scss">

$dark-accent-color: #282a36;
$dark-secondary-color: #44475b;

.dialog-item {
  position: relative;
  display: flex;
  width: 100%;
  padding: 15px 15px;
  background-color: $dark-accent-color;
  cursor: pointer;
  transition: background-color .35s ease;

  &:hover:not(&--active) {
    background-color: $dark-secondary-color;
  }

  .data {
    position: relative;
    width: 100%;

    .name {
      margin-bottom: 5px;
      color: #fff;
      font-weight: 500;
    }

    .preview {
      font-size: 13px;
      color: #556089;
      font-weight: 500;
    }

    .time {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 11px;
      font-weight: 700;
      color: #535f89;
    }
  }

  &--active {
    border-radius: 5px 0 0 5px;
    background-color: #e7ebf0;
    cursor: default;

    .data {
      .name {
        color: #333;
      }
      .time {
        color: #636363;
      }
    }
  }
}

</style>
