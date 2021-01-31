<template>
  <div
    class="user-avatar"
    :class="{
      'user-avatar__lg': lg
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
    lg: Boolean
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

$avatar-size: 40px;
$avatar-size-lg: 55px;

@mixin setAvatarSize($size: $avatar-size) {
  width: $size;
  min-width: $size;
  height: $size;
}

.user-avatar {
  @include setAvatarSize();
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;

  img {
    max-width: 100%;
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
}
</style>
