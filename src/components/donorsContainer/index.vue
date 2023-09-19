<template>
    <div class="donor-container" v-show="isDonorContainer">
        <div class="donor-container__title">
            <p class="donor-container__title__txt">Donor<img class="donor-container__title__add-donor__btn" src="@/assets/add-icon.png"/></p>
            <div class="donor-container__title__menu">
                <p class="donor-container__title__menu__txt" @click="debounceSelectRepresentative"><img class="donor-container__title__menu__img" src="@/assets/representative-icon.png"/>Assign rep</p>
                <!-- Assign representative form -->
                <div v-show="isAssignRep" class="donor-container__title__menu__rep-drop-down">
                    <form class="donor-container__title__menu__rep-drop-down__form" @submit.prevent="assignRep">
                        <div class="donor-container__title__menu__rep-drop-down__form__title"><p style="display: flex; align-items: center;">Assign area representative</p><img @click.prevent="isAssignRep = false; selectedRep = null" style="width: 1.5rem; height: 1.5rem; cursor: pointer;" src="@/assets/x.png"/></div>
                        <p class="donor-container__title__menu__rep-drop-down__form__description">Assign alternative representative for the below donors</p>
                        <div class="donor-container__title__menu__rep-drop-down__form__select-rep" @click.prevent="controlShowRepList">
                            <div v-if="selectedRep != null" class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info">
                                <p style="font-size: .8rem; margin-bottom: .5rem;">Representative</p>
                                <div class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__card">
                                    <img class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__card__img" src="@/assets/user-representative.png"/>
                                    <div style="display: flex; flex-direction: column; width: 100%;">
                                        <p style="font-size:.8rem color: #343C6A; margin-bottom:.25rem;">{{ selectedRep.username }}</p>
                                        <p style="font-size:.8rem; color: #7D979B; margin-bottom:.25rem;">{{ selectedRep.reg_number }}</p>
                                        <p class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__card__txt">
                                            <span style="display: flex; align-items:center;"><img class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__card__txt__img" src="@/assets/location.png"/>{{ preprocessData(selectedRep, 'city') }}</span>
                                            <span style="display: flex; align-items:center;"><img class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__card__txt__img" src="@/assets/call-icon.png"/>{{ preprocessData(selectedRep, 'mobile') }}</span>
                                        </p>
                                    </div>
                                    <img style="width: 1.4rem; height: 1.4rem" src="@/assets/down-status.png"/>
                                </div>
                            </div>
                            <div v-else class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info">
                                <p style="font-size: .8rem; margin-bottom: .5rem;">Representative</p>
                                <span class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__none">
                                    <input type="text" class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__search" placeholder="Select Area Representative">
                                    <img style="width: 1.4rem; height: 1.4rem" src="@/assets/down-status.png"/>
                                </span>
                            </div>
                        </div>
                        <div v-show="showRepList" class="representative-list">
                            <div v-for="rep in areaRepresentatives.area_representatives" :id="rep.id" :key="rep.id" @click.prevent="setRep(rep)" class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__card">
                                <img class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__card__img" src="@/assets/user-representative.png"/>
                                <div class="representative-list__rep">
                                    <p style="font-size:.8rem color: #343C6A; margin-bottom:.25rem;">{{ rep.username }}</p>
                                    <p style="font-size:.8rem; color: #7D979B; margin-bottom:.25rem;">{{ rep.reg_number }}</p>
                                    <p class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__card__txt">
                                        <span style="display: flex; align-items:center; width:50%"><img class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__card__txt__img" src="@/assets/location.png"/>{{ preprocessData(rep, 'city') }}</span>
                                        <span style="display: flex; align-items:center; width:50%"><img class="donor-container__title__menu__rep-drop-down__form__select-rep__rep-info__card__txt__img" src="@/assets/call-icon.png"/>{{ preprocessData(rep, 'mobile') }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button :disabled="selectedRep === null" type="submit" class="donor-container__title__menu__rep-drop-down__form__submit">Proceed</button>
                    </form>
                </div>
                <p class="donor-container__title__menu__txt"><img class="donor-container__title__menu__img" src="@/assets/donors-request.png"/>Donor request</p>
                <p class="donor-container__title__menu__txt"><img class="donor-container__title__menu__img" src="@/assets/promote-icon2.png"/>Promote as a head request</p>
                <p class="donor-container__title__menu__txt"><img class="donor-container__title__menu__img" src="@/assets/mail-icon2.png"/>Invite donor</p>
            </div>
        </div>
        <div class="donor-container__analysis">
            <p class="donor-container__analysis__count"><span style="margin-right: .2rem; font-weight: bold;">{{ donorCount }}</span>Donor(s)</p>
            <input class="donor-container__analysis__search-bar" type="text" v-model="search" id="searchBar" placeholder="Search by reg no., name, phone number …." @input.prevent="debounceSearchDonor(search)"/>
            <img class="donor-container__analysis__search-icon" src="@/assets/search-icon.png"/>
        </div>
        <!-- Display the donors details -->
        <div class="donor-container__entry">
            <div v-show="debounceLoading" class="donor-container__debounce-loading">
                <a-spin style="position: absolute; top: 10rem;"/>
            </div>
            <table style="width: 100%;">
                <tr>
                    <th class="donor-container__entry__title">
                        <div class="selection-checkbox">
                            <input type="checkbox" v-model="selectAll" @change="selectAllRows">
                        </div>
                        <td v-for="head in allHead" :key="head" :id="head">{{ head }}</td>
                    </th>
                </tr>
                <tr class="donor-container__entry__data" v-for="donor in this.donorData.donors" :key="donor.id" :id="donor.id" :class="{ selected: isSelected(donor.id) }" @click.prevent="goToDonor(donor.id)">
                    <div class="selection-checkbox" @click.stop>
                        <input type="checkbox" v-model="selectedDonors" :value="donor.id">
                    </div>
                    <td v-for="dataKey in allData" :key="dataKey">
                        <span v-if="dataKey == 'status' && dataKey != null">
                            <span v-if="donor[dataKey] == true" class="active-user">Active</span>
                            <span v-else class="inactive-user">Inactive</span>
                        </span>
                        <span v-else>
                            {{ preprocessData(donor, dataKey) }}
                        </span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="donor-container__footer" v-if="donorCount !== 0 && debounceLoading === false">
            <p class="donor-container__analysis__count">Showing {{ startEntry }} - {{ endEntry }} of {{ donorCount }}</p>
            <a-pagination v-model:current="requiredPage" v-model:pageSize="entries" :total="donorCount" show-less-items/>
        </div>
        <a-empty v-if="donorCount == 0" :image="simpleImage" class="donor-container__no-data"/>
    </div>
    <router-view v-show="isDonorDetails"></router-view>
</template>

<script>
import { ref, computed } from 'vue';
import DonorService from '@/services/DonorService.ts';
import Notify from '@/services/NotificationService.ts';
import { Empty } from 'ant-design-vue';
import Debounce from 'lodash/debounce';
export default{
    name: 'DonorsContainer',
    beforeCreate() {
        this.debounceSearchDonor = Debounce((searchValue, pageValue) => {
            this.searchDonor(searchValue, pageValue);
            this.debounceLoading= true;
        }, 300);
        this.debounceSelectRepresentative = Debounce(() => {
            this.selectRepresentative();
            this.debounceLoading= true;
            setTimeout(() => {
                this.debounceLoading = false;
            }, 5000);
        }, 300);
    },
    mounted() {
        this.debounceSearchDonor(this.search);
    },
    setup(){
        const debounceLoading = ref(false);
        const isDonorContainer = ref(true);
        const isDonorDetails = ref(false);
        const isAssignRep = ref(false);
        const selectedRep = ref(null);
        const donorData = ref({});
        const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
        const donorCount = ref(0);
        const totalPage = ref(0);
        const requiredPage = ref(1);
        const entries = ref(50);
        const search = ref('');
        const selectAll = ref(false);
        const areaRepresentatives = ref([]);
        const showRepList = ref(false);
        const selectedDonors = ref([]);
        const allHead =[
                'Donor ID',
                'Name',
                'Mobile',
                'Group#',
                'Type',
                'Group Head',
                'Country',
                'State',
                'District',
                'Pincode',
                'Status',
        ];
        const allData = [
                'reg_number',
                'username',
                'mobile',
                'group',
                'donor_type',
                'head_reg_number',
                'country',
                'state',
                'city',
                'pincode',
                'status',
        ];
        const startEntry = computed(() => {
            return ((requiredPage.value - 1) * entries.value + 1);
        });
        const endEntry = computed(() => {
            return Math.min(requiredPage.value * entries.value, donorCount.value);
        });
        return{
            debounceLoading,
            isDonorContainer,
            isDonorDetails,
            isAssignRep,
            selectedRep,
            donorData,
            simpleImage,
            donorCount,
            totalPage,
            requiredPage,
            entries,
            search,
            allHead,
            allData,
            startEntry,
            endEntry,
            selectAll,
            showRepList,
            selectedDonors,
            areaRepresentatives,
        };
    },
    methods:{
        async searchDonor(search, page = 1) {
            this.isDonorDetails = false;
            this.isDonorContainer = true;
            const response =  await DonorService.searchDonor(search,page);
            if(response && response.status == 200){
                this.donorData = response.data;
                this.donorCount = this.donorData['total_record_count'];
                this.totalPage = this.donorData['total_number_of_pages'];
                this.requiredPage = this.donorData['current_page'];
                this.debounceLoading = false;

                // Get the current URL and parse it
                const urlParams = new URLSearchParams(window.location.search);
                // Set or update query parameters
                urlParams.set('page', page);
                // Create a new URL with the updated query parameters
                const newURL = `${window.location.pathname}?${urlParams.toString()}`;
                // Change the URL without reloading the page
                window.history.pushState({}, '', newURL);
            }
        },
        async selectRepresentative(){
            if(this.selectedDonors.length != 0){
                const areaRep = await DonorService.getRepresentatives();
                if(areaRep && areaRep.status == 200){
                    this.debounceLoading = false;
                    this.areaRepresentatives = areaRep.data;
                    this.isAssignRep = true;
                }
            }
            else{
                this.debounceLoading= false;
                if (this.debounceTimeout){
                    clearTimeout(this.debounceTimeout);
                }
                Notify.createNotification('warning','Warning','Select atleast one donor to assign representative');
            }
        },
        async assignRep(){
            if(this.selectedRep !== null){
                this.isAssignRep = false;
                const idData = {
                    admin:{
                        representative_id: this.selectedRep.id,
                        donor_ids: this.selectedDonors,
                    }
                };
                const response = await DonorService.setRepresentatives(idData);
                if(response && response.status == 200){
                    this.debounceLoading = false;
                    this.selectedRep = null;
                    this.selectedDonors = [];
                }
            }
            else{
                Notify.createNotification('warning','Warning','Please select the representative and continue');
            }
        },
        selectAllRows() {
            if (this.selectAll){
                // If selectAll is true, select all donors
                this.selectedDonors = this.donorData.donors.map(donor => donor.id);
            }
            else {
                // If selectAll is false, deselect all donors
                this.selectedDonors = [];
            }
        },
        isSelected(donorId){
            return this.selectedDonors.includes(donorId);
        },
        goToDonor(donorId){
            this.isDonorContainer = false;
            this.isDonorDetails = true;
            this.$router.push(`/donors/${donorId}`);
        },
        preprocessData(donor, dataKey) {
            if(dataKey == 'mobile'){
                return donor.isd_code+'-'+donor.mobile_number;
            }
            else if(dataKey == 'country' && donor[dataKey] != null){
                return donor[dataKey].name;
            }
            else if(dataKey == 'state' && donor[dataKey] != null){
                return donor[dataKey].name;
            }
            else if(dataKey == 'city' && donor[dataKey] != null){
                return donor[dataKey].name;
            }
            // For other dataKeys, return the original value
            return donor[dataKey];
        },
        controlShowRepList(){
            this.showRepList = !this.showRepList;
        },
        setRep(rep){
            this.selectedRep = rep;
            this.showRepList = false;
        }
    },
    watch: {
        requiredPage(newPage) {
            this.debounceSearchDonor(this.search, newPage);
        },
    },
}
</script>

<style>
@import '@/components/donorsContainer/style.scss';

.selection-checkbox{
    display: flex; 
    align-items: center; 
    justify-content: center; 
    width: 2rem; 
    height: 3.5rem;
    cursor: pointer;
}

.selected{
    background: #e6f7ff;
    border-color: rgba(0, 0, 0, 0.03);
}

.selected:hover{
    background: #dcf4ff;
}

.active-user{
    font-size: .8rem;
    font-weight: 400;
    color: #82B85C;
}

.inactive-user{
    font-size: .8rem;
    font-weight: 400;
    color: #E55251;
}
</style>