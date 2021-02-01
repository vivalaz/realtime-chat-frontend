<template>
  <div class="auth-container">
    <div class="auth-form-container">
      <h3 class="title">
        Авторизация
      </h3>

      <form class="auth-form" autocomplete="off" novalidate @submit.prevent="onSubmit">
        <InputWithLabel
          v-model="$v.email.$model"
          reference="email-input"
          type="email"
          label="Email"
          :has-error="$v.email.$invalid"
        />
        <InputWithLabel
          v-model="$v.password.$model"
          reference="password-input"
          type="password"
          label="Пароль"
          :has-error="$v.password.$invalid"
        />

        <ChatButton
          :disabled="processing || $v.$anyError"
          :loading="processing"
        >
          Войти
        </ChatButton>
      </form>

      <div class="description">
        Нет аккаунта для общения? <br>
        <NuxtLink to="/signup">
          Пройдите простую регистрацию!
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  layout: 'auth',
  middleware: 'guest',
  data () {
    return {
      email: '',
      password: '',
      error: null,
      processing: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      containsUppercase (value) {
        return /[A-Z]/.test(value)
      },
      containsLowercase (value) {
        return /[a-z]/.test(value)
      },
      containsNumber (value) {
        return /[0-9]/.test(value)
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.processing = true

        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
      } catch (e) {
        this.error = e
      } finally {
        this.processing = false
      }
    }
  }
}
</script>
