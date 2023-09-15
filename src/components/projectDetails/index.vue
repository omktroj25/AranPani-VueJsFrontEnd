<template>
    <div class="project-details-component">
        <p class="project-details-component__back-project" @click.prevent="goToProjects"><img class="project-details-component__back-project__img" src="@/assets/back-icon.png"/>Projects</p>
        <div class="project-details-component__main-container">
            <!-- Informtion displaying container -->
            <div class="project-details-component__main-container__info">
                <!-- Name input form -->
                <div class="project-details-component__main-container__info__name-input">
                    <div class="project-details-component__main-container__info__name-input__name">
                        <input  :disabled="!isEditName" :class="{ 'edit-mode-on__border': isEditName }" id="name" type="text" :value="projectData.name" class="project-details-component__main-container__info__name-input__name__txt" style="font-size: 1.7rem;"/>
                        <input  :disabled="!isEditName" :class="{ 'edit-mode-on__border': isEditName }" id="temple_name_tamil" type="text" :value="projectData.temple_name_tamil" class="project-details-component__main-container__info__name-input__name__txt"/>
                    </div>
                    <div class="project-details-component__main-container__info__name-input__edit">
                        <img v-show="isEditName === true ? false : true" @click.prevent="editNameControl" class="project-details-component__main-container__info__name-input__edit__icon" src="@/assets/edit-icon.png"/>
                        <img v-show="isEditName" class="project-details-component__main-container__info__name-input__edit__control" src="@/assets/done-icon.png"/>
                        <img v-show="isEditName" @click.prevent="editNameControl" class="project-details-component__main-container__info__name-input__edit__control" src="@/assets/close-icon.png"/>
                    </div>
                </div>
                <!-- Photo upload card -->
                <div class="project-details-component__main-container__info__card">
                    <div class="main-preview-screen">
                        <input type="file" accept="image/*" id="image-upload" style="display: none;">
                        <label v-show="projectData.project_attachment_url == null" for="image-upload">
                            <img src="@/assets/main-img.png" alt="Upload Image" class="main-img">
                        </label>
                        <img v-show="projectData.project_attachment_url != null" :src="projectData.project_attachment_url" class="main-img">
                    </div>
                    <div class="sub-preview-screen">
                        <span v-for="(image,index) in projectData.project_attachments" :key="i">
                            <img v-if="image.image_url != projectData.project_attachment_url && image.image_url != null" :src="image.image_url" :id="image.id" @load="imageCount++" class="sub-img">
                        </span>
                        <input type="file" accept="image/*" id="image-upload" style="display: none;">
                        <label v-show="imageCount < 8" for="image-upload">
                            <img src="@/assets/sub-img.png" alt="Upload Image" class="sub-img">
                        </label>
                    </div>
                </div>
                <!-- Information form -->
                <div class="project-details-component__main-container__info__details">
                    <div class="project-details-component__main-container__info__details__title" :style="isEditAll ? 'justify-content: space-between' : 'justify-content: flex-start'">
                        <p class="project-details-component__main-container__info__details__title__txt">Project Details</p>
                        <div class="project-details-component__main-container__info__details__title__edit">
                            <img v-show="isEditAll === true ? false : true" @click.prevent="editAllControl" class="project-details-component__main-container__info__details__title__edit__icon" src="@/assets/edit-icon.png"/>
                            <img v-show="isEditAll" class="project-details-component__main-container__info__details__title__edit__control" src="@/assets/done-icon.png"/>
                            <img v-show="isEditAll" @click.prevent="editAllControl" class="project-details-component__main-container__info__details__title__edit__control" src="@/assets/close-icon.png"/>
                        </div>
                    </div>
                    <form class="project-details-component__main-container__info__details__fields">
                        <div class="project-details-component__main-container__info__details__fields__rack">
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <label for="reg_number" class="input-label">Registration Number</label>
                                <input disabled="true" id="reg_number" type="text" :value="projectData.reg_number" style="color: #3F3F3F;" class="input-field"/>
                            </div>
                            <!-- <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <label for="start_date" class="input-label">Planned Start Date</label>
                                <a-date-picker :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="start_date" v-model:value="projectData.start_date" :locale="locale" style="background-color: white;" class="input-field" placeholder="Select start date" format="DD/MM/YYYY" />
                            </div>
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <label for="end_date" class="input-label">Planned End Date</label>
                                <a-date-picker :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="end_date" v-model:value="projectData.end_date" :locale="locale" style="background-color: white;" class="input-field" placeholder="Select end date" format="DD/MM/YYYY" />
                            </div> -->
                        </div>
                        <div class="project-details-component__main-container__info__details__fields__rack">
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <label for="estimated_amt" class="input-label">Estimate Amount</label>
                                <input :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="estimated_amt" :value="projectData.estimated_amt" placeholder="-" type="text" class="input-field"/>
                            </div>
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <label for="expensed_amt" class="input-label">Expensed Amount</label>
                                <input :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="expensed_amt"  :value="projectData.expensed_amt" placeholder="-" type="text" class="input-field"/>
                            </div>
                            <div class="project-details-component__main-container__info__details__fields__rack__progress">
                                <p style="font-size: .9rem; color: #343C6A;">{{ projectData.completion === null ? '0% Completion' : projectData.completion + '% Completion' }}<span style="font-size: .6rem; color: #7F91B0; margin-left: .5rem;">last update on {{ updateDate }}</span><span style="font-size: .6rem; color: #7F91B0; margin-top: .5rem; margin-bottom: .25rem;">{{ updateMonth }}</span></p>
                                <a-progress :percent="progressRound(projectData.completion)" size="small" strokeColor="#83b85c" style="width: 12rem; margin: .5rem 0rem;"></a-progress>
                            </div>
                        </div>
                        <div class="project-details-component__main-container__info__details__fields__rack" style="margin: 0rem 0rem 1rem;"> 
                            <label for="incharge_name" class="input-label" style="margin-top: 2rem;">Temple Incharge</label>
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <span style="position: relative;">
                                    <input :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="incharge_name" :value="projectData.incharge_name" type="text" class="input-field" style="font-size: 1rem; padding-left: 2.25rem;">
                                    <img class="input-field-icon" src="@/assets/name-icon.png"/>
                                </span>
                                <input :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="temple_incharge_name_tamil" :value="projectData.temple_incharge_name_tamil" type="text" class="input-field" style="font-size: 1rem; padding-left: 2.25rem;"/>
                            </div>
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <span style="position: relative;">
                                    <vue-tel-input :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="incharge_mobile_number" v-model:value="projectData.incharge_mobile_number" @country-changed="countryChanged" :value="countryCode" class="input-field-phone"></vue-tel-input>
                                    <img class="input-field-icon" src="@/assets/call-icon.png"/>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- Activity form -->
                <div class="project-details-component__main-container__info__activity">
                    <p class="project-details-component__main-container__info__activity__title">Activity<span><img src="@/assets/plus-icon.png" id="addActivity" class="project-details-component__main-container__info__activity__title__add-icon"/></span></p>
                    <div>

                    </div>
                </div>
            </div>
            <!-- Document displaying container -->
            <div class="project-details-component__main-container__doc">
                <!-- Scrap form -->
                <div class="project-details-component__main-container__doc__scrap">
                    <span @click.prevent="openScrapControl" class="project-details-component__main-container__doc__scrap__span"><img class="project-details-component__main-container__doc__scrap__btn" id="scrap" src="@/assets/vertical-menu.png"/></span>
                    <div @click.prevent="scrapConfirmControl" v-show="openScrap" class="project-details-component__main-container__doc__scrap__drop-down">
                        <img class="project-details-component__main-container__doc__scrap__drop-down__icon" src="@/assets/trash.png"/>
                        <p class="project-details-component__main-container__doc__scrap__drop-down__txt">Scrap project</p>
                    </div>
                    <div v-show="scrapConfirm" class="project-details-component__main-container__doc__scrap__confirm">
                        <form class="project-details-component__main-container__doc__scrap__confirm__form">
                            <div class="project-details-component__main-container__doc__scrap__confirm__form__title"><p style="display: flex; align-items: center;"><img class="project-details-component__main-container__doc__scrap__confirm__form__title__icon" src="@/assets/blue-trash.png"/>Scrap project</p><img @click.prevent="scrapClose" style="width: 1.5rem; height: 1.5rem; cursor: pointer;" src="@/assets/x.png"/></div>
                            <p class="project-details-component__main-container__doc__scrap__confirm__form__description">Are you sure to scrap the project? the project will be temporarily removed from the platform</p>
                            <div class="project-details-component__main-container__doc__scrap__confirm__form__project-details">
                                <p class="project-details-component__main-container__doc__scrap__confirm__form__project-details__name">{{ projectData.name }}</p>
                                <p class="project-details-component__main-container__doc__scrap__confirm__form__project-details__location">{{ projectData.location_name }}</p>
                            </div>
                            <p class="project-details-component__main-container__doc__scrap__confirm__form__reason">Reason</p>
                            <textarea id="scrapReason" class="project-details-component__main-container__doc__scrap__confirm__form__reason-input"></textarea>
                            <button type="submit" class="project-details-component__main-container__doc__scrap__confirm__form__reason-btn">Scrap project</button>
                        </form>
                    </div>
                </div>
                <!-- Status manager -->
                <div class="project-details-component__main-container__doc__status">
                    <span style="display: flex; justify-content: space-between;">
                        <p class="project-details-component__main-container__doc__status__title">Status</p>
                        <span v-show="isConfirm">
                            <img class="project-details-component__main-container__doc__status__title__control" src="@/assets/done-icon.png"/>
                            <img @click="isConfirm = false" class="project-details-component__main-container__doc__status__title__control" src="@/assets/close-icon.png"/>
                        </span>
                    </span>
                    <p class="project-details-component__main-container__doc__status__description">Configure the status of the project</p>
                    <div @click.prevent="selectStatusControl" :disabled="!isComplete" class="project-details-component__main-container__doc__status__btn">
                        <span style="display: flex; align-items: center;">
                            <span class="project-details-component__main-container__doc__status__btn__dot"></span>
                            <p class="project-details-component__main-container__doc__status__btn__txt">{{ projectData.status }}</p>
                        </span>
                        <div><img class="project-details-component__main-container__doc__status__btn__arrow" src="@/assets/down-status.png"/></div>
                    </div>
                    <div v-show="selectStatus" @click.prevent="changeStatus" class="project-details-component__main-container__doc__status__btn__drop-down">
                        <p class="project-details-component__main-container__doc__status__btn__drop-down__title">Change Project Status</p>
                        <div class="project-details-component__main-container__doc__status__btn__drop-down__select">
                            <span class="project-details-component__main-container__doc__status__btn__drop-down__dot"></span>
                            <p class="project-details-component__main-container__doc__status__btn__drop-down__txt">{{ nextStatus }}</p>
                        </div>
                    </div>
                    <div v-show="projectData.status === 'scrapped'" class="project-details-component__main-container__doc__status__btn__scraped">
                        <p class="project-details-component__main-container__doc__status__btn__scraped__title">Reason</p>
                        <p class="project-details-component__main-container__doc__status__btn__scraped__reason">Not available</p>
                    </div>
                    <!-- Planned status form -->
                    <div v-show="plannedForm" class="project-details-component__main-container__doc__status__planned">
                        <form class="project-details-component__main-container__doc__status__planned__form">
                            <div class="project-details-component__main-container__doc__status__planned__form__title"><p style="display: flex; align-items: center;">Update Project Details</p><img @click.prevent="plannedForm = false" style="width: 1.5rem; height: 1.5rem; cursor: pointer;" src="@/assets/x.png"/></div>
                            <div class="project-details-component__main-container__doc__status__planned__form__date">
                                <div class="project-details-component__main-container__doc__status__planned__form__date__input">
                                    <label class="plan-input-label">Planned Start Date</label>
                                    <a-date-picker style="background-color: white;" class="plan-input-field" placeholder="Select start date" format="DD/MM/YYYY" />
                                </div>
                                <div class="project-details-component__main-container__doc__status__planned__form__date__input">
                                    <label class="plan-input-label">Planned End Date</label>
                                    <a-date-picker style="background-color: white;" class="plan-input-field" placeholder="Select end date" format="DD/MM/YYYY" />
                                </div>
                            </div>
                            <label class="plan-input-label">Estimated Amount</label>
                            <span style="position: relative;">
                                <input type="text" placeholder="Enter estimated amount" class="project-details-component__main-container__doc__status__planned__form__amount"/>
                                <img class="project-details-component__main-container__doc__status__planned__form__rupee-img" src="@/assets/rupee.png"/>
                            </span>
                            <button type="submit" class="project-details-component__main-container__doc__status__planned__update-btn">Update project</button>
                        </form>
                    </div>
                    <!-- Completed status form -->
                    <div v-show="completeForm" class="project-details-component__main-container__doc__status__completed">
                        <form class="project-details-component__main-container__doc__status__completed__form">
                            <div class="project-details-component__main-container__doc__status__completed__form__title"><p style="display: flex; align-items: center;">Complete Project</p><img @click.prevent="completeForm = false" style="width: 1.5rem; height: 1.5rem; cursor: pointer;" src="@/assets/x.png"/></div>
                            <p class="project-details-component__main-container__doc__status__completed__form__description">Once page is moved to completed, you cannot edit anything. Please ensure data is fully correct</p>
                            <div class="project-details-component__main-container__doc__status__completed__form__project-details">
                                <p class="project-details-component__main-container__doc__status__completed__form__project-details__name">{{ projectData.name }}</p>
                                <p class="project-details-component__main-container__doc__status__completed__form__project-details__location">{{ projectData.location_name }}</p>
                            </div>
                            <button type="submit" class="project-details-component__main-container__doc__status__completed__update-btn">Confirm</button>
                        </form>
                    </div>
                </div>
                <!-- Location form -->
                <div class="project-details-component__main-container__doc__location">
                    <div class="project-details-component__main-container__doc__location__edit">
                        <img v-show="isEditMap === true ? false : true" @click.prevent="editMapControl" class="project-details-component__main-container__doc__location__edit__btn" src="@/assets/edit-icon.png"/>
                        <img v-show="isEditMap" class="project-details-component__main-container__doc__location__edit__control" src="@/assets/done-icon.png"/>
                        <img v-show="isEditMap" @click.prevent="editMapControl" class="project-details-component__main-container__info__name-input__edit__control" src="@/assets/close-icon.png"/>
                    </div>
                    <div class="project-details-component__main-container__doc__location__name">
                        <input  :disabled="!isEditMap" :class="{ 'edit-mode-on__border': isEditMap }" id="location_name" type="text" class="project-details-component__main-container__doc__location__name__txt" style="font-size: 1.6rem;"/>
                        <input  :disabled="!isEditMap" :class="{ 'edit-mode-on__border': isEditMap }" id="location_name_tamil" type="text" class="project-details-component__main-container__doc__location__name__txt"/>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectService from '@/services/ProjectService';
import { ref } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
// import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
export default{
    name: 'ProjectDetails',
    components:{
        VueTelInput,
    },
    mounted(){
        this.getProjectId();
        this.getProjectDetailsById(this.projectId);
    },
    setup(){
        const projectId = ref();
        const projectData = ref({});
        const countryCode = ref("");
        const isEditAll = ref(false);
        const isEditName = ref(false);
        const isEditMap = ref(false);
        const isComplete = ref(false);
        const selectStatus = ref(false);
        const openScrap = ref(false);
        const scrapConfirm = ref(false);
        const completeForm = ref(false);
        const isConfirm = ref(false);
        const plannedForm = ref(false);
        const updateDate = ref();
        const updateMonth = ref();
        const nextStatus = ref('');
        const imageCount = ref(0);
        const statusType = {
            scrapped: {
                txt: '#98A7BF',
                bg: '#E9EDF2'
            },
            proposed: {
                txt: '#7E90B0',
                bg: '#E9EDF2'
            },
            planned: {
                txt: '#F1A801',
                bg: '#FDF0DD'
            },
            active: {
                txt: '#396AFF',
                bg: '#DEE6FF'
            },
            completed: {
                txt: '#82B85C',
                bg: '#F0F6EB'
            },
            };

        return{
            // locale,
            projectId,
            projectData,
            nextStatus,
            statusType,
            countryCode,
            isEditAll,
            isEditName,
            isEditMap,
            isComplete,
            selectStatus,
            scrapConfirm,
            plannedForm,
            completeForm,
            isConfirm,
            openScrap,
            updateDate,
            updateMonth,
            imageCount,
        }
    },
    methods:{
        getProjectId(){
            const element = document.querySelector('.project-details-component');
            this.projectId = element.getAttribute('projectid');
        },
        async getProjectDetailsById(){
            const response = await ProjectService.getProject(this.projectId);
            if(response && response.status == 200){
                this.projectData = response.data.project;
                this.updateProgressDate(this.projectData.updated_at);
                this.setNextStatus(this.projectData.status);
            }
        },
        changeStatus(){
            console.log(this.nextStatus);
            if(this.nextStatus == 'proposed'){
                this.isConfirm = true;
            }
            else if(this.nextStatus == 'planned'){
                this.plannedForm = true;
            }
            else if(this.nextStatus == 'active'){
                this.isConfirm = true;
            }
            else if(this.nextStatus == 'completed'){
                this.completeForm = true;
            }
        },
        setNextStatus(status){
            if(status !== 'completed'){
                for (const key in this.statusType) {
                    if (key === status) {
                        const keys = Object.keys(this.statusType);
                        const currentIndex = keys.indexOf(key);
                        if (currentIndex !== -1 && currentIndex < keys.length - 1) {
                            this.nextStatus = keys[currentIndex + 1];
                            this.setStatusStyles(status);
                            this.setNextStatusStyles(this.nextStatus);
                        }
                        break;
                    }
                }
            }
            else{
                this.setStatusStyles(status);
                this.selectStatus = false;
            }
        },
        setStatusStyles(status){
            const statusBtn = document.querySelector(".project-details-component__main-container__doc__status__btn");
            const statusTxt = document.querySelector(".project-details-component__main-container__doc__status__btn__txt");
            const statusDot = document.querySelector(".project-details-component__main-container__doc__status__btn__dot");

            if (status in this.statusType) {
                const statusInfo = this.statusType[status];
                statusBtn.style.backgroundColor = statusInfo.bg;
                statusTxt.style.color = statusInfo.txt;
                statusDot.style.backgroundColor = statusInfo.txt;
            }
        },
        setNextStatusStyles(nextStatus){
            const nextDot = document.querySelector(".project-details-component__main-container__doc__status__btn__drop-down__dot");
            const nextBtn = document.querySelector(".project-details-component__main-container__doc__status__btn__drop-down__txt");

            if (nextStatus in this.statusType) {
                const nextStatusInfo = this.statusType[nextStatus];
                nextBtn.style.color = nextStatusInfo.txt;
                nextDot.style.backgroundColor = nextStatusInfo.txt;
            }
        },
        progressRoundString(percent){
            return (percent === null ? '0' : percent.toString());
        },
        progressRound(percent){
            return percent == null ? 0 : percent;
        },
        updateProgressDate(timestamp){
            const dateObj = new Date(timestamp);
            const year = dateObj.getFullYear();
            const month = dateObj.toLocaleString('default', { month: 'long' });
            const date = dateObj.getDate();
            this.updateDate = date;
            this.updateMonth = ` ${month},${year}`;
        },
        goToProjects(){
            this.$router.push('/projects');
        },
        editNameControl(){
            this.isEditName = !this.isEditName;
        },
        editAllControl(){
            this.isEditAll = !this.isEditAll;
        },
        editMapControl(){
            this.isEditMap = !this.isEditMap;
        },
        selectStatusControl(){
            if(this.projectData.status !== 'completed'){
                this.selectStatus = !this.selectStatus;
            }
            this.isComplete = true;
        },
        openScrapControl(){
            this.openScrap = !this.openScrap;
        },
        scrapConfirmControl(){
            this.scrapConfirm = !this.scrapConfirm;
        },
        scrapClose(){
            this.scrapConfirmControl();
            this.openScrapControl();
        },
        countryChanged(country){
            this.countryCode = "+"+country.dialCode;
        },
        count(){
            this.imageCount++;
            console.log(this.imageCount)
            return true;
        }
    },
    watch:{
        isEditAll(){
            const phoneCode = document.querySelector('.vti__dropdown');
            if (this.isEditAll) {
                phoneCode.style.display = 'flex';
            } else {
                phoneCode.style.display = 'none';
            }
        },
    },
}
</script>

<style>
@import '@/components/projectDetails/style.scss';
@import '@/styles/designOverRide.scss';

.edit-mode-on__border {
    border-bottom: 0.0625rem solid rgba(128, 128, 128, 0.562);
}

</style>