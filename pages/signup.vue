<template>
  <div class="auth-container">
    <div class="auth-form-container">
      <h3 class="title">
        Регистрация
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
        <InputWithLabel
          v-model="$v.passwordConfirm.$model"
          reference="password-confirm-input"
          type="password"
          label="Подтвердите пароль"
          :has-error="$v.passwordConfirm.$invalid"
        />

        <ChatButton
          :disabled="processing || $v.$anyError"
          :loading="processing"
        >
          Зарегестрироваться
        </ChatButton>
      </form>

      <div class="description">
        Уже зарегестрированы? <br>
        <NuxtLink to="/login">
          Войти
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
  layout: 'auth',
  middleware: 'guest',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
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
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.processing = true

        await this.$axios.post('user', {
          email: this.email,
          password: this.password,
          name: ''
        })

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
