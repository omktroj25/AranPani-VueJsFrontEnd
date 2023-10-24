<template>
    <div class="payment">
        <p class="payment__title">Payment Details</p>
        <div class="payment__cumulative" >
            <p class="payment__cumulative__title">Total Donations<span class="payment__cumulative__amount">₹ {{ paymentSum.total_amount }}</span></p>
            <p class="payment__cumulative__title">Financial Year Donation<span class="payment__cumulative__amount">₹ {{ paymentSum.financial_year_amount }}</span></p>
        </div>
        <div v-for="payment in paymentData" :key="payment.id" @click.prevent="toggleBill(payment)" class="payment__banner">
            <div :id="payment.id" style="display: flex; justify-content: space-between;">
                <p class="date">{{ formatDateMY(payment.date) }}<span class="donate">Donated for 1</span></p>
                <p class="amount">₹ {{ payment.amount }}<span class="paid">Paid</span></p>
            </div>
            <div v-show="payment.showBill" class="payment__banner__bill">
                <p class="title">Payment info</p>
                <div class="category">
                    <p class="question">
                        <span>Date</span>
                        <span>Mode</span>
                        <span>Transaction ID</span>
                        <span>Paid by</span>
                    </p>
                    <p class="answer">
                        <span>{{ formatDateDMY(payment.date) }}</span>
                        <span>Paid to rep</span>
                        <span>-</span>
                        <span>{{ payment.donor_name }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import DonorService from '@/services/DonorService';
export default{
    name: 'PaymentDetails',
    props:{
        rDonorId:{
            type: Number,
            required: true,
        }
    },
    setup(){
        const donorId = ref();
        const paymentData = ref({});
        const paymentSum = ref({});
        return{
            donorId,
            paymentData,
            paymentSum,
        }
    },
    methods:{
        async getPaymentDetails(){
            const response = await DonorService.getPaymentDetailsById(this.donorId);
            if(response && response.status == 200){
                this.paymentData = response.data.payments;
                this.paymentSum = response.data.stats;
            }
        },
        toggleBill(payment){
            payment.showBill = !payment.showBill;
        },
        formatDateMY(dateString) {
            const date = new Date(dateString);
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            return `${month},${year}`;
        },
        formatDateDMY(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
    },
    watch:{
        rDonorId(){
            if(this.rDonorId !== null){
                this.donorId = this.rDonorId;
                this.getPaymentDetails();
            }
        }
    }
}
</script>

<style>
@import '@/components/donorDetails/paymentDetails/style.scss';
</style>