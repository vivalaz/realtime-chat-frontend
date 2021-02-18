<template>
  <div class="empty-chat-alert">
    <span>
      Выберите чат из списка
    </span>
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>

<style scoped lang="scss">

.empty-chat-alert {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: $dark-accent-color;

  span {
    font-weight: 600;
    font-size: 1.375em;
    color: $dark-secondary-color;
  }
}

</style>
