<template>
  <div class="editable-user-avatar" @click="openFileExplorer">
    <user-avatar v-bind="{...$props, ...$attrs}" />

    <input ref="user-avatar-input" type="file" @input="onFileChange">
  </div>
</template>

<script>
import UserAvatar from '~/components/user/UserAvatar'

export default {
  name: 'EditableUserAvatar',
  components: { UserAvatar },
  data () {
    return {
      file: null
    }
  },
  methods: {
    openFileExplorer () {
      this.$refs['user-avatar-input'].click()
    },
    async uploadFile (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await this.$axios.put('/user/update-photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        this.$auth.setUser(response.data)
      } catch (e) {
        console.error(e)
      }
    },
    onFileChange (event) {
      const files = event.target.files

      if (files && files.length) {
        this.uploadFile(files[0])
      }
    }
  }
}
</script>

<style scoped lang="scss">

.editable-user-avatar {
  border-radius: 50%;
  cursor: pointer;

  input {
    display: none;
  }
}

</style>
