<template>
  <div>{{ $route.params.chat }}</div>
</template>

<script>
export default {
  middleware: ['auth', 'chatable-id']
}
</script>

<style scoped lang="scss">

</style>
