<template>
  <div class="server-error-notification">
    {{ data.data }}
  </div>
</template>

<script>
export default {
  name: 'ServerErrorNotification',
  props: {
    data: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">

.server-error-notification {
  padding: 0.625em 0.938em;
  margin-top: 0.625em;
  background-color: #e54d42;
  border-left: 4px solid #b82e24;
  color: #fff;
  font-size: 0.875em;
  font-weight: 500;
  border-radius: 3px;
}

</style>
