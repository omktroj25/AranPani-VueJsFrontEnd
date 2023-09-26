<template>
    <span v-if="donorData != null ? donorDataDetails = donorData : donorDataDetails = {}"></span>
    <div class="donor-details__main-content__self__details">
        <div class="donor-details__main-container__self__title" :style="isEditAll ? 'justify-content: space-between' : 'justify-content: flex-start'">
            <p class="">Profile Details</p>
            <div class="donor-details__main-container__self__title__edit">
                <img v-show="isEditAll === true ? false : true" @click.prevent="editAllControl" class="donor-details__main-container__self__title__edit__icon" src="@/assets/edit-icon.png"/>
                <img v-show="isEditAll" @click.prevent="updateName" class="donor-details__main-container__self__title__edit__control" src="@/assets/done-icon.png"/>
                <img v-show="isEditAll" @click.prevent="editAllControl" class="donor-details__main-container__self__title__edit__control" src="@/assets/close-icon.png"/>
            </div>
        </div>
        <form class="donor-details__main-content__self__details__fields">
            <div class="donor-details__main-content__self__details__fields__rack">
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="reg_number" class="input-label-donor">Registration Number</label>
                    <input v-model="donorDataDetails.reg_number" disabled="true" id="reg_number" style="color: #3F3F3F;" class="input-field-donor"/>
                </div>
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="mobile_number" class="input-label-donor">Phone Number</label>
                    <input :value="`${donorDataDetails.isd_code} ${donorDataDetails.mobile_number}`" disabled="true" id="mobile_number" style="color: #3F3F3F;" class="input-field-donor"/>
                </div>
            </div>
            <div class="donor-details__main-content__self__details__fields__rack">
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="country" class="input-label-donor">Country</label>
                    <a-select :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="country" placeholder="Select country" class="input-field-donor">
                        <a-select-option v-for="country in countryMeta" :key="country.id" :id="country.id" :value="country.name"></a-select-option>
                    </a-select>
                </div>
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="state" class="input-label-donor">State</label>
                    <a-select :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="state" placeholder="Select state" class="input-field-donor">
                        <a-select-option v-for="state in stateMeta" :key="state.id" :id="state.id" :value="state.name"></a-select-option>
                    </a-select>
                </div>
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="city" class="input-label-donor">City</label>
                    <a-select :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="city" placeholder="Select city" class="input-field-donor">
                        <a-select-option v-for="city in cityMeta" :key="city.id" :id="city.id" :value="city.name"></a-select-option>
                    </a-select>
                </div>
            </div>
            <div class="donor-details__main-content__self__details__fields__rack">
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="pincode" class="input-label-donor">Pincode</label>
                    <input v-model="donorDataDetails.pincode" :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="pincode" placeholder="-" type="text" class="input-field-donor"/>
                </div>
                <div class="donor-details__main-content__self__details__fields__rack__input" style="width: 100%;">
                    <label for="address" class="input-label-donor">Address</label>
                    <input v-model="donorDataDetails.address_line1" :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="address" placeholder="-" type="text" class="input-field-donor" style="width: 100%;"/>
                </div>
            </div>
            <div class="donor-details__main-content__self__details__fields__rack">
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="guardian_name" class="input-label-donor">Father/Husband name</label>
                    <input v-model="donorDataDetails.guardian_name" :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="guardian_name" placeholder="-" type="text" class="input-field-donor"/>
                </div>
                <div class="donor-details__main-content__self__details__fields__rack__input" style="width: 100%;">
                    <label for="email" class="input-label-donor">Email</label>
                    <input v-model="donorDataDetails.email" :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="email" placeholder="-" type="text" class="input-field-donor" style="width: 100%;"/>
                </div>
            </div>
            <div class="donor-details__main-content__self__details__fields__rack">
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="pan" class="input-label-donor">PAN Number</label>
                    <input v-model="donorDataDetails.pan" :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="pan" placeholder="-" type="text" class="input-field-donor"/>
                </div>
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="identification_card" class="input-label-donor">ID Type</label>
                    <a-select :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="identification_card" placeholder="Select ID Cards" class="input-field-donor">
                        <a-select-option v-for="card in idMeta" :key="card.id" :id="card.id" :value="card.name"></a-select-option>
                    </a-select>
                </div>
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="identification_card_value" class="input-label-donor">ID Number</label>
                    <input v-model="donorDataDetails.identification_card_value" :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="identification_card_value" placeholder="-" type="text" class="input-field-donor"/>
                </div>
            </div>
            <div class="donor-details__main-content__self__details__fields__rack">
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="gender" class="input-label-donor">Gender</label>
                    <a-select :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="gender" placeholder="Select gender" class="input-field-donor">
                        <a-select-option v-for="gender in genderMeta" :key="gender.id" :id="gender.id" :value="gender.category"></a-select-option>
                    </a-select>
                </div>
                <div class="donor-details__main-content__self__details__fields__rack__input">
                    <label for="age" class="input-label-donor">Age</label>
                    <input v-model="donorDataDetails.age" :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="age" placeholder="-" type="text" class="input-field-donor"/>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
// import DonorService from '@/services/DonorService';
import MetaService from '@/services/MetaService';
export default{
    name: 'DonorProfileDetails',
    props:{
        donorData:{
            type: Object,
            required: true,
        }
    },
    mounted(){
        this.refreshAll();
    },
    setup(){
        const donorDataDetails = ref({});
        const isEditAll = ref(false);
        const countryMeta = ref({});
        const stateMeta = ref({});
        const cityMeta = ref({});
        const genderMeta = ref({});
        const idMeta = ref({});
        return{
            donorDataDetails,
            isEditAll,
            countryMeta,
            stateMeta,
            cityMeta,
            genderMeta,
            idMeta,
        }
    },
    methods:{
        refreshAll(){
            this.getCountryMeta();
            this.getStateMeta();
            this.getCityMeta();
            this.getGenderMeta();
            this.getIdMeta();
        },
        async getCountryMeta(){
            const response = await MetaService.getCountries();
            if(response && response.status == 200){
                this.countryMeta = response.data.countries;
            }
        },
        async getStateMeta(){
            const response = await MetaService.getStates();
            if(response && response.status == 200){
                this.stateMeta = response.data.states;
            }
        },
        async getCityMeta(){
            const response = await MetaService.getCities();
            if(response && response.status == 200){
                this.cityMeta = response.data.cities;
            }
        },
        async getGenderMeta(){
            const response = await MetaService.getGender();
            if(response && response.status == 200){
                this.genderMeta = response.data.genders;
            }
        },
        async getIdMeta(){
            const response = await MetaService.getIdentificationCards();
            if(response && response.status == 200){
                this.idMeta = response.data.identification_cards;
            }
        },
        editAllControl(){
            this.isEditAll = !this.isEditAll;
        },
    },
    computed: {
        selectedCountry: {
            get() {
                return this.donorDataDetails.country ? this.donorDataDetails.country.name : null;
            },
            set(value) {
                if (value === null) {
                    this.donorDataDetails.country = null;
                } else {
                    const selectedCountry = this.countryMeta.find((country) => country.name === value);
                    this.donorDataDetails.country = selectedCountry || null;
                }
            },
        },
    },
}
</script>

<style>
@import '@/components/donorDetails/donorProfileDetails/style.scss';

.ant-select-selector{
    background: white !important;
    border: none !important;
    border-radius: 0 !important;
}

</style>