<template>
  <div class="editable-user-avatar" @click="openFileExplorer">
    <upload-icon />
    <user-avatar-spinner v-if="processing" />
    <user-avatar v-bind="{...$props, ...$attrs}" />

    <input ref="user-avatar-input" type="file" @input="onFileChange">
  </div>
</template>

<script>
import UserAvatar from '~/components/user/UserAvatar'
import UserAvatarSpinner from '~/components/icons/UserAvatarSpinner'
import UploadIcon from '~/components/icons/UploadIcon'

export default {
  name: 'EditableUserAvatar',
  components: { UploadIcon, UserAvatarSpinner, UserAvatar },
  data () {
    return {
      file: null,
      processing: false
    }
  },
  methods: {
    openFileExplorer () {
      this.$refs['user-avatar-input'].click()
    },
    async uploadFile (file) {
      try {
        this.processing = true

        const formData = new FormData()
        formData.append('file', file)

        const response = await this.$axios.put('/user/update-photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        await this.$auth.setUser(response.data)
      } catch (e) {
        console.error(e)
      } finally {
        this.processing = false
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
  position: relative;
  border-radius: 50%;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 10px);
    height: 100%;
    background: rgba(0, 0, 0, .5);
    border-radius: 50%;
    opacity: 0;
    transition: opacity .35s ease;
  }

  input {
    display: none;
  }

  .upload-icon-svg {
    position: absolute;
    top: 50%;
    left: calc(50% - 5px);
    width: 25px;
    fill: #fff;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity .35s ease;
  }

  &:hover {
    &:before,
    .upload-icon-svg {
      opacity: 1;
    }
  }
}

</style>
