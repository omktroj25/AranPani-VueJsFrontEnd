<template>
  <div class="auth">
    <div class="auth__container">
      <div :class="container">
        <p :class="container + '__greet'">Welcome back to <span>Aran Pani</span></p>
        <LoginForm/>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './LoginForm.vue'
export default {
  name: `Auth`,
  components:{
    LoginForm
  },
  data(){
    return{
      container: 'auth__container__login-component',
    }
  }
}
</script>

<style>
@import './Auth.scss';
</style>
