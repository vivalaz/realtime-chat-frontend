<template>
  <div class="dialog-item" :class="{'dialog-item--active': active}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'UserItemWrapper',
  props: {}
}
</script>

<style scoped lang="scss">

</style>
