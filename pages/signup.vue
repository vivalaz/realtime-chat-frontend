<template>
  <div class="signup-container">
    <div class="signup-form-container">
      <h3 class="title">
        Регистрация
      </h3>

      <form class="signup-form" autocomplete="off" @submit.prevent="onSubmit">
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
        <InputWithLabel
          v-model="passwordConfirm"
          reference="password-confirm-input"
          type="password"
          label="Подтвердите пароль"
          :has-error="$v.passwordConfirm.$invalid"
        />

        <ChatButton
          :disabled="$v.$anyError"
        >
          Зарегестрироваться
        </ChatButton>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
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
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async onSubmit () {
      try {
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

        await this.$router.push('/')
      } catch (e) {
        this.error = e
      }
    }
  }
}
</script>

<style scoped lang="scss">

.signup-container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    margin-bottom: 8px;
    font-size: 25px;
    color: #313e4c;
  }

  .signup-form-container {
    display: flex;
    min-width: 320px;
    max-width: 320px;
    flex-direction: column;
  }

  .signup-form {
    padding: 30px 15px 15px 15px;
    background-color: #313e4c;
    border-radius: 5px;
  }
}

</style>
