<template>
  <div class="label-container">
    <label
      class="labeled-input"
      :class="{
        'has-error': hasError
      }"
      :for="reference"
    >
      <span v-if="label">{{ label }}</span>
      <input :id="reference" v-model="localValue" :type="type" :placeholder="placeholder">
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputWithLabel',
  props: {
    value: {
      required: false,
      type: String,
      default: ''
    },
    reference: {
      required: false,
      type: String,
      default: null
    },
    label: {
      required: false,
      type: String,
      default: null
    },
    type: {
      required: false,
      type: String,
      default: 'text'
    },
    placeholder: {
      required: false,
      type: String,
      default: ''
    },
    hasError: Boolean
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

.label-container {
  display: block;
  width: 100%;
  margin-bottom: 0.938em;

  .labeled-input {
    display: block;
    width: 100%;

    span {
      display: block;
      margin-bottom: 0.313em;
      font-size: 0.938em;
      color: #fff;
      font-weight: 500;
    }

    input {
      width: 100%;
      border: none;
      outline: none;
      padding: 0.5em 0.625em;
      border-radius: 0.125em;
      background-color: #e7ebf0;
      font-weight: 500;
      font-size: 0.875em;
      transition: background-color .35s ease;

      &:focus {
        background-color: #fff;
      }
    }
  }
}

</style>
