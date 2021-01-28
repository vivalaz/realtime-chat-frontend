<template>
  <button class="chat-button" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ChatButton',
  props: {
    disabled: Boolean
  }
}
</script>

<style lang="scss">

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
  background-color: #3e5162;
  cursor: pointer;
  border-radius: 2px;
  transition: background .35s ease;

  &:hover {
    background: #578ec9;
  }
}

</style>
