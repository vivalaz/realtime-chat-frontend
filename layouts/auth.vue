<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  background-color: #e7ebf0;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>

<style lang="scss">

$dark-accent-color: #282a36;
$dark-secondary-color: #44475b;

.auth-container {
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

  .auth-form-container {
    display: flex;
    min-width: 320px;
    max-width: 320px;
    flex-direction: column;
  }

  .auth-form {
    padding: 30px 15px 15px 15px;
    background-color: $dark-accent-color;
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
