<template>

  <div class="dialog-item" :class="{'dialog-item--active': active}">

    <div class="avatar">
      <img :src="avatar" alt="Avatar">
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
export default {
  name: 'DialogItem',
  props: {
    active: Boolean,
    avatar: {
      required: false,
      default () {
        return require('~/assets/default-avatar.svg')
      },
      type: String
    }
  }
}
</script>

<style scoped lang="scss">

$avatar-size: 40px;

.dialog-item {
  position: relative;
  display: flex;
  width: 100%;
  padding: 20px 15px;
  background-color: #2d3d4f;
  border-bottom: 1px solid rgba(255, 255, 255, .035);
  cursor: pointer;
  transition: background-color .35s ease;

  &:hover:not(&--active) {
    background-color: #212e3c;
  }

  .avatar {
    width: $avatar-size;
    min-width: $avatar-size;
    height: $avatar-size;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;

    img {
      max-width: 100%;
    }
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
      color: #7a8ca0;
      font-weight: 500;
    }

    .time {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 11px;
      font-weight: 700;
      color: #c3c3c3;
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
