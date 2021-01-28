<template>
  <div class="signup-container">
    <div class="signup-form-container">
      <h3 class="title">
        Регистрация
      </h3>

      <form class="signup-form">
        <label for="email-input">
          <span>Email</span>
          <input id="email-input" type="email">
        </label>
        <label for="password-input">
          <span>Пароль</span>
          <input id="password-input" type="password">
        </label>

        <ChatButton disabled>Зарегестрироваться</ChatButton>
      </form>
    </div>
  </div>
</template>

<script>
export default {}
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

    label {
      display: block;
      width: 100%;
      margin-bottom: 15px;

      span {
        display: block;
        margin-bottom: 5px;
        font-size: 15px;
        color: #fff;
        font-weight: 500;
      }

      input {
        width: 100%;
        border: none;
        outline: none;
        padding: 8px 10px;
        border-radius: 2px;
        background-color: #e7ebf0;
        font-weight: 500;
        font-size: 14px;
        transition: background-color .35s ease;

        &:focus {
          background-color: #fff;
        }
      }
    }
  }
}

</style>
