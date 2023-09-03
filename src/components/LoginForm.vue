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
import axios from 'axios';
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
        async login() {
            // Create a data object to send in the request
            const requestData = {
                user: {
                email: this.email,
                password: this.password,
                permissions: []
                }
            };
            const maxRetries = 3; 
            let retries = 0;
            while (retries < maxRetries) {
                try {
                const response = await axios.post('https://api.uat.aranpani.in/api/v1/users/sign_in', requestData);
                // Handle the successful response here
                console.log('Login Successful');
                console.log(response);
                    if(response.status == 200){
                        alert("User logged in successfully");
                    }
                return;
                } catch (error) {
                    if(error.response.status == 401){
                        alert("Unauthorized user");
                        return;
                    }
                    else if(error.response.status == 500){
                        alert("Internal server error");
                        return;
                    }
                    else{
                        retries++;
                        if (retries < maxRetries) {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        } else {
                            console.error('Max retries reached. Unable to login.');
                            return;
                        }
                    }
                    console.error('Login Error');
                    console.error(error);
                }
            }
        }
    },
};
</script>

<style>
@import '@/components/LoginForm.scss';
</style>