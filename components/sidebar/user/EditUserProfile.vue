<template>
  <div class="edit-user-profile">
    <form @submit.prevent="onSubmitEditProfile">
      <InputWithLabel
        v-model="name"
        reference="name"
        label="Имя"
      />
      <InputWithLabel
        v-model="phone"
        reference="phone"
        label="Телефон"
      />
      <InputWithLabel
        v-model="description"
        reference="description"
        label="О себе"
      />
      <ChatButton
        :disabled="processing"
        :loading="processing"
      >
        Редактировать
      </ChatButton>
    </form>
  </div>
</template>

<script>
import InputWithLabel from '~/components/InputWithLabel'
import ChatButton from '~/components/ChatButton'

export default {
  name: 'EditUserProfile',
  components: {
    ChatButton,
    InputWithLabel
  },
  data () {
    return {
      name: '',
      phone: '',
      description: '',
      processing: false
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  beforeMount () {
    this.preInitData()
  },
  methods: {
    preInitData () {
      this.name = this.user.displayName

      if (this.user.data) {
        this.phone = this.user.data.phone
        this.description = this.user.data.description
      }
    },
    async onSubmitEditProfile () {
      try {
        this.processing = true

        const { data } = await this.$axios.put('user', {
          name: this.name,
          phone: this.phone,
          description: this.description
        })

        this.$emit('onEdit', data)
      } catch (e) {
        console.error(e)
      } finally {
        this.processing = false
      }
    }
  }
}
</script>

<style scoped lang="scss">

.edit-user-profile {

}

</style>
