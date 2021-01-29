<template>
  <div class="login-container">
    <div class="login-form-container">
      <h3 class="title">
        Авторизация
      </h3>

      <form class="login-form" autocomplete="off" @submit.prevent="onSubmit">
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

        // await this.$router.push('/')
      } catch (e) {
        this.error = e
      }
    }
  }
}
</script>

<style scoped lang="scss">

.login-container {
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

  .login-form-container {
    display: flex;
    min-width: 320px;
    max-width: 320px;
    flex-direction: column;
  }

  .login-form {
    padding: 30px 15px 15px 15px;
    background-color: #313e4c;
    border-radius: 5px;
  }

  .description {
    margin-top: 10px;
    text-align: center;
    color: #585858;
    font-size: 15px;
    a {
      color: #313e4c;
      font-weight: 500;

      &:hover {
        text-decoration: none;
      }
    }
  }
}

</style>
