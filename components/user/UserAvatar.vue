<template>
  <div
    class="user-avatar"
    :class="{
      'user-avatar__lg': lg,
      'user-avatar__online': online
    }"
    :title="name"
  >
    <img v-if="src" :src="src" :alt="name">

    <div
      v-else
      class="default-avatar"
      :style="{
        backgroundColor: getRandomBackgroundColor
      }"
    >
      {{ getInitialsFromName }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    src: {
      required: false,
      type: String,
      default: null
    },
    name: {
      required: false,
      type: String,
      default: ''
    },
    lg: Boolean,
    online: Boolean
  },
  data () {
    return {
      backgrounds: [
        '#ff5350',
        '#ffb965',
        '#45fc75',
        '#6171a6',
        '#87e9ff',
        '#be90fc',
        '#ff76c7'
      ]
    }
  },
  computed: {
    getRandomBackgroundColor () {
      return this.backgrounds[~~(Math.random() * this.backgrounds.length)]
    },
    getInitialsFromName () {
      if (!this.name) {
        return '?'
      }

      const name = this.name.trim()

      if (!name.includes(' ')) {
        return name.charAt(0)
      }

      const arrayOfNames = name.split(' ')
      if (arrayOfNames.length) {
        return `${arrayOfNames[0].charAt(0)}${arrayOfNames[1].charAt(0)}`
      }

      return this.name
    }
  }
}
</script>

<style scoped lang="scss">

@mixin setAvatarSize($size: $avatar-size) {
  width: $size;
  min-width: $size;
  height: $size;
}

.user-avatar {
  position: relative;
  @include setAvatarSize();
  margin-right: 0.625em;
  border-radius: 50%;
  border: 2px solid $dark-accent-color;
  overflow: hidden;
  transition: all .35s ease;

  img {
    width: 100%;
    max-width: 100%;
    height: 100%;
  }

  .default-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    font-weight: 700;
  }

  &__lg {
    @include setAvatarSize($avatar-size-lg);

    .default-avatar {
      font-size: 18px;
    }
  }

  &__online {
    border-color: #27cc27;
  }
}
</style>
