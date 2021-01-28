<template>
  <label class="labeled-input" :for="reference">
    <span>{{ label }}</span>
    <input :id="reference" v-model="localValue" :type="type">
  </label>
</template>

<script>
export default {
  name: 'InputWithLabel',
  props: {
    reference: {
      required: false,
      type: String,
      default: null
    },
    label: {
      required: true,
      type: String,
      default: ''
    },
    type: {
      required: false,
      type: String,
      default: 'text'
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.labeled-input {
  display: block;
  width: 100%;
  margin-bottom: 15px;

  span {
    display: block;
    margin-bottom: 5px;
    font-size: 15px;
    color: #fff;
    font-weight: 500;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    padding: 8px 10px;
    border-radius: 2px;
    background-color: #e7ebf0;
    font-weight: 500;
    font-size: 14px;
    transition: background-color .35s ease;

    &:focus {
      background-color: #fff;
    }
  }
}

</style>
