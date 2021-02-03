<template>
  <div class="index-container">
    <Sidebar />
  </div>
</template>

<script>
import Sidebar from '~/components/sidebar/Sidebar'

export default {
  components: { Sidebar },
  middleware: 'auth'
}
</script>

<style lang="scss">

.index-container {

}

</style>
