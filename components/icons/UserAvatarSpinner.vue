<template>
  <svg
    id="L3"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    enable-background="new 0 0 0 0"
    xml:space="preserve"
    class="user-avatar-spinner-svg"
  >
    <circle
      fill="none"
      stroke="#fff"
      stroke-width="4"
      cx="50"
      cy="50"
      r="44"
    />
    <circle
      fill="#fff"
      stroke="#e74c3c"
      stroke-width="3"
      cx="8"
      cy="54"
      r="6"
    >
      <animateTransform
        attributeName="transform"
        dur="2s"
        type="rotate"
        from="0 50 48"
        to="360 50 52"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
</template>

<script>
export default {
  name: 'UserAvatarSpinner'
}
</script>

<style scoped lang="scss">

.user-avatar-spinner-svg {
  position: absolute;
  max-width: 100%;
  width: 100%;
  transform: translate3d(-5px, -5px, 0);
}

</style>
