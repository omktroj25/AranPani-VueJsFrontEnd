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
import SidebarContainer from '@/components/SidebarContainer.vue';
import MainContainer from '@/components/MainContainer.vue';
export default{
    name: 'CommonContainer',
    components:{
        SidebarContainer,
        MainContainer,
    },
}
</script>

<style>
@import '@/components/CommonContainer.scss';
</style>