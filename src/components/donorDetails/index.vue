<template>
    <div class="donor-details">
        <p class="donor-details__title" @click.prevent="goToDonors"><img class="donor-details__title__img" src="@/assets/back-icon.png"/>Donor</p>
        <div class="donor-details__main-container">
            <div class="donor-details__main-container__self">
                <div class="donor-details__main-container__self__name" :style="isEditName ? 'justify-content: space-between' : 'justify-content: flex-start'">
                    <p class="donor-details__main-container__self__name__donor">
                        <img class="donor-details__main-container__self__name__donor__img" src="@/assets/user-representative.png"/>
                        <input v-model="donorData.username" :disabled="!isEditName" :class="{ 'edit-mode-on__border': isEditName }" type="text" placeholder="-" class="donor-details__main-container__self__name__donor__txt"/>
                    </p>
                    <div class="donor-details__main-container__self__name__edit">
                        <img v-show="isEditName === true ? false : true" @click.prevent="editNameControl" class="donor-details__main-container__self__name__edit__icon" src="@/assets/edit-icon.png"/>
                        <img v-show="isEditName" @click.prevent="updateName" class="donor-details__main-container__self__name__edit__control" src="@/assets/done-icon.png"/>
                        <img v-show="isEditName" @click.prevent="editNameControl" class="donor-details__main-container__self__name__edit__control" src="@/assets/close-icon.png"/>
                    </div>
                </div>
                <!-- Donor profile details -->
                <ProfileDetails :donorData="donorData"/>
                <!-- Donor subscription details -->
                <SubscriptionDetails :donorData="donorData"/>
                <!-- Donor payment details -->
                <PaymentDetails :rDonorId="donorData.id"/>
            </div>
            <div class="donor-details__main-container__team">
                
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import DonorService from '@/services/DonorService';
import ProfileDetails from '@/components/donorDetails/profileDetails/index.vue';
import SubscriptionDetails from '@/components/donorDetails/subscriptionDetails/index.vue';
import PaymentDetails from '@/components/donorDetails/paymentDetails/index.vue';
export default{
    name: 'DonorsDetails',
    components:{
        ProfileDetails,
        SubscriptionDetails,
        PaymentDetails,
    },
    mounted(){
        this.getDonorId();
        this.getDonorDetailsById(this.donorId);
    },
    setup(){
        const donorId = ref();
        const donorData = ref({});
        const isEditName = ref(false);
        return{
            donorId,
            donorData,
            isEditName,
        }
    },
    methods:{
        getDonorId(){
            const element = document.querySelector('.donor-details');
            this.donorId = element.getAttribute('donorid');
        },
        async getDonorDetailsById(){
            const response = await DonorService.getDonorDetails(this.donorId);
            if(response && response.status == 200){
                this.donorData = response.data.donor;
            }
        },
        editNameControl(){
            this.isEditName = !this.isEditName;
        },
        goToDonors(){
            this.$router.push('/donors');
        },
    }
}
</script>

<style>
@import '@/components/donorDetails/style.scss';
</style>