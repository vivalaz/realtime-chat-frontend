<template>
  <div class="auth-container">
    <div class="auth-form-container">
      <h3 class="title">
        Авторизация
      </h3>

      <form class="auth-form" autocomplete="off" novalidate @submit.prevent="onSubmit">
        <InputWithLabel
          v-model="email"
          reference="email-input"
          type="email"
          label="Email"
          :has-error="$v.email.$invalid"
        />
        <InputWithLabel
          v-model="password"
          reference="password-input"
          type="password"
          label="Пароль"
          :has-error="$v.password.$invalid"
        />

        <ChatButton
          :disabled="$v.$anyError"
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
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  layout: 'auth',
  middleware: 'guest',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  validations: {
    email: {
      required
      // email
    },
    password: {
      required,
      minLength: minLength(8)
      // containsUppercase (value) {
      //   return /[A-Z]/.test(value)
      // },
      // containsLowercase (value) {
      //   return /[a-z]/.test(value)
      // },
      // containsNumber (value) {
      //   return /[0-9]/.test(value)
      // }
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
      } catch (e) {
        this.error = e
      }
    }
  }
}
</script>
