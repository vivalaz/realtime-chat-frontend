<template>
  <button class="smart-button" :disabled="disabled">
    <slot v-if="!loading" />
    <template v-else>
      Загрузка...
    </template>
  </button>
</template>

<script>
export default {
  name: 'SmartButton',
  props: {
    disabled: Boolean,
    loading: Boolean
  }
}
</script>

<style lang="scss">

.smart-button {
  border: none;
  outline: none;
  display: flex;
  padding: 0.625em 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #fff;
  font-weight: 300;
  font-size: 0.875em;
  background-color: $dark-secondary-color;
  cursor: pointer;
  border-radius: 0.125em;
  transition: all .35s ease;

  &:hover {
    background-color: #578ec9;
  }

  &:disabled {
    color: #afafaf;
    background-color: #344452;
    cursor: default;

    &:hover {
      background-color: #344452;
    }
  }
}

</style>
