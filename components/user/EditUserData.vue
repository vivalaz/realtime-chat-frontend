<template>

  <form class="edit-profile-form" autocomplete="off" novalidate @submit.prevent="onSubmitEditProfile">
    <InputWithLabel
      v-model="name"
      reference="name-input"
      type="text"
      label="Имя"
    />

    <ChatButton
      :disabled="processing"
      :loading="processing"
    >
      Редактировать
    </ChatButton>
  </form>

</template>

<script>
export default {
  name: 'EditUserData',
  data () {
    return {
      name: '',
      processing: false
    }
  },
  computed: {
    userName () {
      return this.$store.state.auth.user.displayName
    }
  },
  beforeMount () {
    this.name = this.userName
  },
  methods: {
    async onSubmitEditProfile () {
      try {
        this.processing = true

        await this.$axios.put('user', {
          name: this.name
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.processing = false
      }
    }
  }
}
</script>

<style scoped>

</style>
