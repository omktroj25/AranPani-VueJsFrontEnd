<template>
    <div class="subscription">
        <p class="subscription__title">Subscription Details</p>
        <a-select class="subscription__select" placeholder="Select subscription">
        </a-select>
    </div>
</template>

<script>
export default{
    name: 'SubscriptionDetails',
    props:{
        donorData:{
            type: Object,
            required: true,
        }
    },
}
</script>

<style>
@import '@/components/donorDetails/subscriptionDetails/style.scss';
</style>