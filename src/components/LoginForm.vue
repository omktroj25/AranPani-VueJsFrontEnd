<template>
    <form class="auth__container__login-component__form" @submit.prevent="loginUser">
        <p class="auth__container__login-component__form__title">Login to admin portal</p>
        <div class="auth__container__login-component__form__title__email">
            <label for="email" class="input-label">Email ID</label>
            <input id="email" type="email" v-model="email" @input.prevent="validateEmail" placeholder="Enter email"/>
            <p for="email" class="error-input" v-show="emailError">{{ emailErrorMessage }}</p>
        </div>
        <div class="auth__container__login-component__form__title__password">
            <label for="password" class="input-label">Password</label>
            <input id="password" :type="passwordFieldType" v-model="password" @input.prevent="validPassword" placeholder="Enter password" style="width: 100%;"/>
            <img @click.prevent="togglePasswordVisibility" :src="passwordVisibilityIcon" class="view-password"/>
            <p for="password" class="error-input" v-show="passwordError">{{ passwordErrorMessage }}</p>
        </div>
        <p class="forget-password">Forget Password ?</p>
        <input type="submit" id="submit" value="Login" :class="{ 'auth__container__login-component__form__title__invalid-submit': !isFormValid, 'auth__container__login-component__form__title__valid-submit': isFormValid }" :disabled="!isFormValid"/>
    </form>
</template>

<script>
import { ref } from 'vue';
import AuthService from '@/services/AuthService';
export default{
    name: 'LoginForm',
    setup() {
        const email = ref('');
        const emailError = ref(false);
        const emailErrorMessage = ref('');
        const password = ref('');
        const passwordError = ref(false);
        const passwordErrorMessage = ref('');
        const showPassword = ref('');
    return {
        email,
        emailError,
        emailErrorMessage,
        password,
        passwordError,
        passwordErrorMessage,
        showPassword,
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
        async loginUser() {
            if(!(await AuthService.login(this.email,this.password))){
                this.email = '';
                this.password = '';
            }
        },
    },
};
</script>

<style>
@import '@/components/LoginForm.scss';
</style>