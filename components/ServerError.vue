<template>
  <div class="server-error-notification">
    {{ data.data }}
  </div>
</template>

<script>
export default {
  name: 'ServerError',
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
  padding: 10px 15px;
  margin-top: 10px;
  background-color: #e54d42;
  border-left: 4px solid #b82e24;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  border-radius: 3px;
}

</style>
