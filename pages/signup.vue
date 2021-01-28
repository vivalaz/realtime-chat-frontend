<template>
  <div class="signup-container">
    <div class="signup-form-container">
      <h3 class="title">
        Регистрация
      </h3>

      <form class="signup-form" @submit.prevent="onSubmit">
        <InputWithLabel
          v-model="email"
          reference="email-input"
          type="email"
          label="Email"
        />
        <InputWithLabel
          v-model="password"
          reference="password-input"
          type="password"
          label="Пароль"
        />
        <InputWithLabel
          v-model="passwordConfirm"
          reference="password-confirm-input"
          type="password"
          label="Подтвердите пароль"
        />

        <pre>{{$v}}</pre>

        <ChatButton

        >
          Зарегестрироваться
        </ChatButton>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: ''
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
      },
      containsSpecial (value) {
        return /[#?!@$%^&*-]/.test(value)
      }
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      alert('Submit')
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
