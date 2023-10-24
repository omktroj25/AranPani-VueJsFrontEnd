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
  setup(){
    const container= 'auth__container__login-component';
    return{
      container
    }
  },
};
</script>

<style>
@import '@/components/auth/style.scss';
</style>
