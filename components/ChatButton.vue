<template>
  <button class="chat-button" :disabled="disabled">
    <slot v-if="!loading" />
    <template v-else>
      Загрузка...
    </template>
  </button>
</template>

<script>
export default {
  name: 'ChatButton',
  props: {
    disabled: Boolean,
    loading: Boolean
  }
}
</script>

<style lang="scss">

$dark-secondary-color: #44475b;

.chat-button {
  border: none;
  outline: none;
  display: flex;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #fff;
  font-weight: 300;
  font-size: 14px;
  background-color: $dark-secondary-color;
  cursor: pointer;
  border-radius: 2px;
  transition: background-color, color .35s ease;

  &:hover {
    background: #578ec9;
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
