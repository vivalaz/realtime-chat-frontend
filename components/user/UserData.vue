<template>

  <div class="user-data-holder">
    <div class="item">
      <div class="label">
        Имя
      </div>
      <div class="value">
        Виталий
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'UserData'
}
</script>

<style scoped lang="scss">

.user-data-holder {
  .item {
    .label {
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
      color: #cacaca;
    }
    .value {
      font-weight: 500;
      color: #fff;
    }
  }
}

</style>
