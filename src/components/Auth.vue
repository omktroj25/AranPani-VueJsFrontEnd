<template>
  <div class="auth">
    <div class="auth__container">
      <div :class="container">
        <p :class="container + '__greet'">Welcome back to <span>Aran Pani</span></p>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `Auth`,
  data(){
    return{
      container: 'auth__container__login-component',
    }
  },
};
</script>

<style>
@import '@/components/Auth.scss';
</style>
