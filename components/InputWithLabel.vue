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
  margin-bottom: 15px;

  .labeled-input {
    display: block;
    width: 100%;

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

    &.has-error {
      input {
        //box-shadow: 0 0 8px 1px rgba(206, 98, 98, 1);
      }
    }
  }
}

</style>
