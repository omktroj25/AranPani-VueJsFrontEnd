<template>
    <div class="sidebar-container">
        <p class="sidebar-container__title">Aran Pani</p>
        <ul>
            <router-link class="sidebar-container__option" v-for="option in options" :key="option" :id="option" :to="`/${option.toLowerCase()}`" :class="{ 'sidebar-option-selected': option === selectedOption }" @click.prevent="selectOption(option)">
                <img class="sidebar-container__option__icon" :src="require(`@/assets/${option}.png`)"/>
                <span class="sidebar-container__option__txt" :style="{ textDecoration: option === selectedOption ? 'underline #396AFF' : 'underline #040930'}">{{option}}</span>
            </router-link>
        </ul>
        <div class="sidebar-container__user-settings">
            <div class="sidebar-container__user-settings__admin">
                <p class="sidebar-container__user-settings__admin__img-bg">
                    <img class="sidebar-container__user-settings__admin__img-bg__icon" src="@/assets/User.png">
                </p>
                <p class="sidebar-container__user-settings__admin__txt">
                    <span>Admin</span>
                    <span>Admin</span>
                </p>
            </div>
            <div class="sidebar-container__user-settings__menu-btn" @click.prevent="toggleUserMenu">
                <img class="sidebar-container__user-settings__menu-btn__icon" src="@/assets/arrow.png">
            </div>
            <div class="sidebar-container__user-settings__menu" v-show="isUserMenu">
                <ul>
                    <li class="sidebar-container__user-settings__menu__option" style="padding-bottom: 1rem; border-bottom: .07rem solid #595D81;">
                        <img src="@/assets/Admin.png" class="sidebar-container__user-settings__menu__option__img">
                        <p class="sidebar-container__user-settings__menu__option__txt">Admin</p>
                    </li>
                    <li class="sidebar-container__user-settings__menu__option">
                        <img src="@/assets/ChangePassword.png" class="sidebar-container__user-settings__menu__option__img">
                        <p class="sidebar-container__user-settings__menu__option__txt">Change Password</p>
                    </li>
                    <li class="sidebar-container__user-settings__menu__option" @click.prevent="logoutUser">
                        <img src="@/assets/Logout.png" class="sidebar-container__user-settings__menu__option__img">
                        <p class="sidebar-container__user-settings__menu__option__txt">Logout</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import LogoutService from '@/services/LogoutService';
export default {
    name: 'SidebarContainer',
    mounted() {
        this.$router.push('/projects');
    },
    setup() {
        const options= [
                'Dashboard',
                'Projects',
                'Donors',
                'Representative',
                'Payment',
                'Internal users',
                'Subscription',
                'Contact Details'
            ];
        const isUserMenu= ref(false);
        const selectedOption = ref('Projects');
        return {
            options,
            isUserMenu,
            selectedOption,
        };
    },
    methods:{
        toggleUserMenu() {
            this.isUserMenu = !this.isUserMenu;
        },
        selectOption(option) {
            if (this.selectedOption) {
                // To remove the class from the previous option
                this.selectedOption = null;
            }
            this.selectedOption = option;
        },
        logoutUser(){
            LogoutService.logout();
        }
    },
};
</script>

<style>
@import '@/components/sidebarContainer/style.scss';
</style>