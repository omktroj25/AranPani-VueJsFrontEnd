<template>
    <div class="common-container">
        <div class="common-container__sidebar-container">
            <SidebarContainer/>
        </div>
        <div class="common-container__main-container">
            <MainContainer/>
        </div>
    </div>
</template>

<script>
import SidebarContainer from '@/components/sidebarContainer/index.vue';
import MainContainer from '@/components/mainContainer/index.vue';
export default{
    name: 'CommonContainer',
    components:{
        SidebarContainer,
        MainContainer,
    },
};
</script>

<style>
@import '@/components/commonContainer/style.scss';
</style>