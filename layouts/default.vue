<template>
  <div class="chat-container">
    <Sidebar />

    <div class="dialog-container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/sidebar/Sidebar'

export default {
  components: { Sidebar }
}
</script>

<style lang="scss">

.chat-container {
  display: flex;
  height: 100vh;

  .dialog-container {
    width: 100%;
  }
}

</style>

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
