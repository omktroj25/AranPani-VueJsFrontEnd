<template>
    <form class="auth__container__login-component__form" @submit.prevent="login">
        <p class="auth__container__login-component__form__title">Login to admin portal</p>
        <div class="auth__container__login-component__form__title__email">
            <label for="email" class="input-label">Email ID</label>
            <input id="email" type="email" v-model="email" @input="validateEmail" placeholder="Enter email"/>
            <p for="email" class="error-input" v-show="emailError">{{ emailErrorMessage }}</p>
        </div>
        <div class="auth__container__login-component__form__title__password">
            <label for="password" class="input-label">Password</label>
            <input id="password" :type="passwordFieldType" v-model="password" @input="validPassword" placeholder="Enter password" style="width: 100%;"/>
            <img @click="togglePasswordVisibility" :src="passwordVisibilityIcon" class="view-password"/>
            <p for="password" class="error-input" v-show="passwordError">{{ passwordErrorMessage }}</p>
        </div>
        <p class="forget-password">Forget Password ?</p>
        <input type="submit" id="submit" value="Login" :class="{ 'auth__container__login-component__form__title__invalid-submit': !isFormValid, 'auth__container__login-component__form__title__valid-submit': isFormValid }" :disabled="!isFormValid"/>
    </form>
</template>

<script>
import AuthService from '@/services/AuthService.ts';
export default{
    name: 'LoginForm',
    data() {
    return {
        email: '',
        emailError: false,
        emailErrorMessage: '',
        password: '',
        passwordError: false,
        passwordErrorMessage: '',
        showPassword: false,
    };
    },
    computed: {
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password';
        },
        passwordVisibilityIcon() {
            return this.showPassword
                        ? require('../assets/eye-icon.png')
                        : require('../assets/hide-eye-icon.png');
        },
        isFormValid() {
            return !this.emailError && !this.passwordError && this.email !== '' && this.password !== '';
        },
    },
    methods: {
        validateEmail() {
        if (!this.email) {
            this.emailError = true;
            this.emailErrorMessage = 'E-mail is required!';
        } else if (!this.isEmailValid(this.email)) {
            this.emailError = true;
            this.emailErrorMessage = 'E-mail is not valid!';
        } else {
            this.emailError = false;
            this.emailErrorMessage = '';
        }
        },
        isEmailValid(email) {
            // Use a regular expression to validate email format
            const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
            return emailRegex.test(email);
        },
        validPassword(){
            if (!this.password){
                this.passwordError = true;
                this.passwordErrorMessage = 'Password is required!';
            }else if (!this.isPasswordValid(this.password)){
                this.passwordError = true;
                this.passwordErrorMessage = 'Password has to be longer than 6 characters!';
            }else{
                this.passwordError = false;
                this.passwordErrorMessage = '';
            }
        },
        isPasswordValid(password){
            const passwordRegex = /^.{7,}$/;
            return passwordRegex.test(password);
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        login() {
            const response = AuthService.login(this.email,this.password);
            console.log(response);
            if(response.status == 200){
                alert("User logged in successfully");
                // this.$router.push('/projects');
            }
            return;
        },
    },
};
</script>

<style>
@import '@/components/LoginForm.scss';
</style>