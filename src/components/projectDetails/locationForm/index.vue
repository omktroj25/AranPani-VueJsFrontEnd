<template>
    <div class="project-details-component__main-container__doc__location">
        <div class="project-details-component__main-container__doc__location__edit">
            <img v-show="isEditMap === true ? false : true" @click.prevent="editMapControl" class="project-details-component__main-container__doc__location__edit__btn" src="@/assets/edit-icon.png"/>
            <img v-show="isEditMap" @click.prevent="updateLocation" class="project-details-component__main-container__doc__location__edit__control" src="@/assets/done-icon.png"/>
            <img v-show="isEditMap" @click.prevent="editMapControl" class="project-details-component__main-container__info__name-input__edit__control" src="@/assets/close-icon.png"/>
        </div>
        <div class="project-details-component__main-container__doc__location__name">
            <input  :disabled="!isEditMap" :class="{ 'edit-mode-on__border': isEditMap }" id="location" v-model="componentProjectData.location" type="text" placeholder="-" class="project-details-component__main-container__doc__location__name__txt" style="font-size: 1.6rem;"/>
            <input  :disabled="!isEditMap" :class="{ 'edit-mode-on__border': isEditMap }" id="location_name_tamil" v-model="componentProjectData.location_name_tamil" type="text" placeholder="-" class="project-details-component__main-container__doc__location__name__txt"/>
        </div>
        <div id="google-map">
            <GoogleMap id='map' api-key="AIzaSyBQ45AwvJjAGhNqR56FzSLmmxceTcapS-I" style="width: 100%; height: 350px" :center="newCenter" :zoom="10">
                <Marker :options="{ position: center }"/>
                <Marker @dragend="onMarkerChange" :options="{ position: newCenter, draggable: true }"/>
            </GoogleMap>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import ProjectService from '@/services/ProjectService';
import { GoogleMap, Marker } from "vue3-google-map";
export default{
    name: 'LocationForm',
    components:{
        GoogleMap,
        Marker,
    },
    props:{
        projectData:{
            type: Object,
            required: true,
        },
        center:{
            type: Object,
            required: true,
        },
    },
    setup(){
        const componentProjectData = ref({});
        const newCenter = ref({});
        const tempCenter = ref({});
        const isEditMap = ref(false);
        return{
            componentProjectData,
            newCenter,
            tempCenter,
            isEditMap,
        }
    },
    methods:{
        async updateLocation(){
            this.isEditMap = false;
            const newData = {
                lat: this.tempCenter.lat,
                long: this.tempCenter.lng,
                location: this.componentProjectData.location,
                location_name_tamil: this.componentProjectData.location_name_tamil,
            }
            const response = await ProjectService.updateProject(this.projectData.id, newData);
            if(response && response.status == 200){
                this.$emit('reloadProjectDetails');
            }
        },
        onMarkerChange(location){
            this.newCenter = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng(),
            };
            this.tempCenter = this.newCenter;
        },
        editMapControl(){
            this.isEditMap = !this.isEditMap;
        },
    },
    watch:{
        projectData(){
            if(this.projectData !== null){
                this.componentProjectData = this.projectData;
            }
        },
        center(){
            if(this.center !== null){
                this.newCenter = this.center;
            }
        },
    }
}
</script>

<style>
@import '@/components/projectDetails/locationForm/style.scss';
</style>