<template>
  <div class="chat-container">
    <Sidebar v-if="isVisibleSidebar" />

    <div class="dialog-container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/sidebar/Sidebar'

export default {
  components: { Sidebar },
  computed: {
    isVisibleSidebar () {
      if (this.$mq === 'lg') {
        return true
      }

      return this.$mq === 'sm' && !this.$route.params.chat
    }
  },
  mounted () {
    this.$webNotification.requestPermission()
  }
}
</script>

<style lang="scss">

.chat-container {
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;

  .dialog-container {
    width: 100%;
  }
}

</style>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>

<style>
html {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  background-color: #e7ebf0;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
