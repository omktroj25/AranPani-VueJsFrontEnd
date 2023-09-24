<template>
    <div class="create-project">
        <form class="create-project__form" @submit.prevent="createProject">
            <div class="create-project__form__title"><p style="display: flex; align-items: center;">New Project</p><img @click.prevent="closeCreateProject" style="width: 1.5rem; height: 1.5rem; cursor: pointer;" src="@/assets/x.png"/></div>
            <div class="create-project__form__field">
                <label for="temple-name" class="input-label-create">Temple Name</label>
                <input id="temple-name" type="text" v-model="templeName" placeholder="Type name" @input.prevent="validateTempleName" class="create-project__form__field__input"/>
                <p for="temple-name" class="error-input-create" v-show="templeNameError">Temple name is required</p>
            </div>
            <div class="create-project__form__field">
                <label for="temple-name-tamil" class="input-label-create">கோவில் பெயர்</label>
                <input id="temple-name-tamil" type="text" v-model="templeNameTamil" placeholder="Type name" @input.prevent="validateTempleNameTamil" class="create-project__form__field__input"/>
                <p for="temple-name-tamil" class="error-input-create" v-show="templeNameTamilError">கோவில் பெயர் தேவை</p>
            </div>
            <div class="create-project__form__field">
                <label for="temple-incharge-name" class="input-label-create">Temple Incharge Name</label>
                <input id="temple-incharge-name" type="text" v-model="templeInchargeName" placeholder="Type name" @input.prevent="validateTempleInchargeName" class="create-project__form__field__input"/>
                <p for="temple-incharge-name" class="error-input-create" v-show="templeInchargeNameError">Incharge name is required!</p>
            </div>
            <div class="create-project__form__field">
                <label for="temple-incharge-name-tamil" class="input-label-create">கோவில் பொறுப்பாளர் பெயர்</label>
                <input id="temple-incharge-name-tamil" type="text" v-model="templeInchargeNameTamil" placeholder="Type name" @input.prevent="validateTempleInchargeNameTamil" class="create-project__form__field__input"/>
                <p for="temple-incharge-name-tamil" class="error-input-create" v-show="templeInchargeNameTamilError">கோவில் பொறுப்பாளர் பெயர் தேவை</p>
            </div>
            <div class="create-project__form__field">
                <label for="phone-number" class="input-label-create">Phone Number</label>
                <vue-tel-input id="phone-number" v-model="phoneNumber" placeholder="Type phone number" @input.prevent="validatePhoneNumber" mode='international' class="create-project__form__field__input"></vue-tel-input>
                <p for="phone-number" class="error-input-create" v-show="phoneNumberError">{{ phoneNumberErrorMessage }}</p>
            </div>
            <div class="create-project__form__field">
                <label for="location" class="input-label-create">Location</label>
                <input id="location" type="text" v-model="location" placeholder="Type location" @input.prevent="validateLocation" class="create-project__form__field__input"/>
                <p for="location" class="error-input-create" v-show="locationError">Location name is required!</p>
            </div>
            <div class="create-project__form__field">
                <label for="temple-name-tamil" class="input-label-create">இடம்</label>
                <input id="temple-name-tamil" type="text" v-model="locationTamil" placeholder="Type name" @input.prevent="validateLocationTamil" class="create-project__form__field__input"/>
                <p for="temple-name-tamil" class="error-input-create" v-show="locationTamilError">இடம் பெயர் தேவை</p>
            </div>
            <div id="google-map" style="margin-top: 1.5rem">
                <GoogleMap id='map' api-key="AIzaSyBQ45AwvJjAGhNqR56FzSLmmxceTcapS-I" style="width: 100%; height: 300px" :center="center" :zoom="13">
                    <Marker @dragend="onMarkerChange" :options="{ position: center, draggable: true }"/>
                </GoogleMap>
            </div>
            <button type="submit" class="create-project__form__create-btn">Create project</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import ProjectService from '@/services/ProjectService';
import Notify from '@/services/NotificationService';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import { GoogleMap, Marker } from "vue3-google-map";
export default{
    name:'CreateProjectForm',
    components:{
        VueTelInput,
        GoogleMap,
        Marker,
    },
    setup(){
        const templeName = ref('');
        const templeNameTamil = ref('');
        const templeInchargeName = ref('');
        const templeInchargeNameTamil = ref('');
        const phoneNumber = ref('');
        const location = ref('');
        const locationTamil = ref('');
        const templeNameError = ref(false);
        const templeNameTamilError = ref(false);
        const templeInchargeNameError = ref(false);
        const templeInchargeNameTamilError = ref(false);
        const phoneNumberError = ref(false);
        const locationError = ref(false);
        const locationTamilError = ref(false);
        const phoneNumberErrorMessage = ref('');
        const center = ref({
            lat: 12.9775196,
            lng: 80.2494393,
        });
        return{
            templeName,
            templeNameTamil,
            templeInchargeName,
            templeInchargeNameTamil,
            phoneNumber,
            location,
            locationTamil,
            templeNameError,
            templeNameTamilError,
            templeInchargeNameError,
            templeInchargeNameTamilError,
            phoneNumberError,
            locationError,
            locationTamilError,
            phoneNumberErrorMessage,
            center,
        }
    },
    methods:{
        async createProject(){
            if(this.isNoError()){
                const newData = {
                    incharge_mobile_number: this.phoneNumber,
                    incharge_name: this.templeInchargeName,
                    lat: this.center.lat,
                    location: this.location,
                    location_name_tamil: this.locationTamil,
                    long: this.center.lng,
                    name: this.templeName,
                    project_attachment_ids: [],
                    project_attachments: [],
                    project_blogs: [],
                    project_document_ids: [],
                    project_documents: [],
                    status: "proposed",
                    temple_incharge_name_tamil: this.templeInchargeNameTamil,
                    temple_name_tamil: this.templeNameTamil,
                };
                const response = await ProjectService.createNewProject(newData);
                if(response && response.status == 200){
                    this.closeCreateProject();
                }
            }
            else{
                Notify.createNotification('warning',`Warning`, 'Please fill the empty fields');
            }
        },
        isNoError() {
            return (
                this.templeName !== '' &&
                this.templeNameTamil !== '' &&
                this.templeInchargeName !== '' &&
                this.templeInchargeNameTamil !== '' &&
                this.phoneNumber !== '' &&
                this.location !== '' &&
                this.locationTamil !== ''
            );
        },
        validateTempleName() {
            if (!this.templeName) {
                this.templeNameError = true;
            }
            else {
                this.templeNameError = false;
            }
        },
        validateTempleNameTamil() {
            if (!this.templeNameTamil) {
                this.templeNameTamilError = true;
            }
            else {
                this.templeNameTamilError = false;
            }
        },
        validateTempleInchargeName() {
            if (!this.templeInchargeName) {
                this.templeInchargeNameError = true;
            }
            else {
                this.templeInchargeNameError = false;
            }
        },
        validateTempleInchargeNameTamil() {
            if (!this.templeInchargeNameTamil) {
                this.templeInchargeNameTamilError = true;
            }
            else {
                this.templeInchargeNameTamilError = false;
            }
        },
        validatePhoneNumber() {
            if (!this.phoneNumber) {
                this.phoneNumberError = true;
                this.phoneNumberErrorMessage = "Mobile number is required";
            }
            else if(this.phoneNumber.length < 5){
                this.phoneNumberError = true;
                this.phoneNumberErrorMessage = "Mobile number should be valid";
            }
            else {
                this.phoneNumberError = false;
            }
        },
        validateLocation() {
            if (!this.location) {
                this.locationError = true;
            }
            else {
                this.locationError = false;
            }
        },
        validateLocationTamil() {
            if (!this.locationTamil) {
                this.locationTamilError = true;
            }
            else {
                this.locationTamilError = false;
            }
        },
        onMarkerChange(location){
            this.center = {
                lat: location.latLng.lat(),
                lng: location.latLng.lng(),
            };
        },
        closeCreateProject(){
            this.templeName = '';
            this.templeNameTamil = '';
            this.templeInchargeName = '';
            this.templeInchargeNameTamil = '';
            this.phoneNumber = '';
            this.location = '';
            this.locationTamil = '';
            this.templeNameError = false;
            this.templeNameTamilError = false;
            this.templeInchargeNameError = false;
            this.templeInchargeNameTamilError = false;
            this.phoneNumberError = false;
            this.locationError = false;
            this.locationTamilError = false;
            this.$emit('closeForm',false);
            this.$emit('reloadProject');
        }
    },
}
</script>

<style>
@import '@/components/createProjectForm/style.scss';
@import '@/styles/designOverRide.scss';
</style>