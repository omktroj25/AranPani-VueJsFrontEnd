<template>
    <div class="project-details-component">
        <p class="project-details-component__back-project" @click.prevent="goToProjects"><img class="project-details-component__back-project__img" src="@/assets/back-icon.png"/>Projects</p>
        <div class="project-details-component__main-container">
            <!-- Informtion displaying container -->
            <div class="project-details-component__main-container__info">
                <!-- Name input form -->
                <div class="project-details-component__main-container__info__name-input">
                    <div class="project-details-component__main-container__info__name-input__name">
                        <input  :disabled="!isEditName" :class="{ 'edit-mode-on__border': isEditName }" id="name" type="text" v-model="projectData.name" class="project-details-component__main-container__info__name-input__name__txt" style="font-size: 1.7rem;"/>
                        <input  :disabled="!isEditName" :class="{ 'edit-mode-on__border': isEditName }" id="temple_name_tamil" type="text" v-model="projectData.temple_name_tamil" class="project-details-component__main-container__info__name-input__name__txt"/>
                    </div>
                    <div class="project-details-component__main-container__info__name-input__edit">
                        <img v-show="isEditName === true ? false : true" @click.prevent="editNameControl" class="project-details-component__main-container__info__name-input__edit__icon" src="@/assets/edit-icon.png"/>
                        <img v-show="isEditName" @click.prevent="updateName" class="project-details-component__main-container__info__name-input__edit__control" src="@/assets/done-icon.png"/>
                        <img v-show="isEditName" @click.prevent="editNameControl" class="project-details-component__main-container__info__name-input__edit__control" src="@/assets/close-icon.png"/>
                    </div>
                </div>
                <!-- Photo upload card -->
                <div class="project-details-component__main-container__info__card">
                    <div class="main-preview-screen">
                        <input type="file" accept="image/*" id="image-upload" @change.prevent="onFileLoad" style="display: none;">
                        <label v-show="projectData.project_attachment_url == null" for="image-upload">
                            <img src="@/assets/main-img.png" alt="Upload Image" class="main-img">
                        </label>
                        <img v-show="projectData.project_attachment_url != null" :src="projectData.project_attachment_url" class="main-img">
                    </div>
                    <div class="sub-preview-screen">
                        <span v-for="image in projectData.project_attachments" :key="image.id">
                            <img v-if="image.image_url != projectData.project_attachment_url && image.image_url != null" :src="image.image_url" :id="image.id" @load="imageCount++" class="sub-img">
                        </span>
                        <input type="file" accept="image/*" id="image-upload" @change.prevent="onFileLoad" style="display: none;">
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
                            <img v-show="isEditAll" @click.prevent="updateDetails" class="project-details-component__main-container__info__details__title__edit__control" src="@/assets/done-icon.png"/>
                            <img v-show="isEditAll" @click.prevent="editAllControl" class="project-details-component__main-container__info__details__title__edit__control" src="@/assets/close-icon.png"/>
                        </div>
                    </div>
                    <form class="project-details-component__main-container__info__details__fields">
                        <div class="project-details-component__main-container__info__details__fields__rack">
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <label for="reg_number" class="input-label">Registration Number</label>
                                <input disabled="true" id="reg_number" type="text" v-model="projectData.reg_number" style="color: #3F3F3F;" class="input-field"/>
                            </div>
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <label for="start_date" class="input-label">Planned Start Date</label>
                                <input type="date" :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="start_date"  v-model="projectData['start_date']" style="background-color: white;" class="input-field" placeholder="Select start date" format="DD/MM/YYYY" />
                            </div>
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <label for="end_date" class="input-label">Planned End Date</label>
                                <input type="date" :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="end_date" v-model="projectData['end_date']" style="background-color: white;" class="input-field" placeholder="Select end date" format="DD/MM/YYYY" />
                            </div>
                        </div>
                        <div class="project-details-component__main-container__info__details__fields__rack">
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <label for="estimated_amt" class="input-label">Estimate Amount</label>
                                <input :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="estimated_amt" v-model="projectData.estimated_amt" placeholder="-" type="text" class="input-field"/>
                            </div>
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <label for="expensed_amt" class="input-label">Expensed Amount</label>
                                <input :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="expensed_amt"  v-model="projectData.expensed_amt" placeholder="-" type="text" class="input-field"/>
                            </div>
                            <div v-show="projectData.status != 'proposed'" class="project-details-component__main-container__info__details__fields__rack__progress">
                                <p style="font-size: .9rem; color: #343C6A;">{{ projectData.completion === null ? '0% Completion' : projectData.completion + '% Completion' }}<span style="font-size: .6rem; color: #7F91B0; margin-left: .5rem;">last update on {{ updateDate }}</span><span style="font-size: .6rem; color: #7F91B0; margin-top: .5rem; margin-bottom: .25rem;">{{ updateMonth }}</span></p>
                                <a-progress :percent="progressRound(projectData.completion)" size="small" strokeColor="#83b85c" style="width: 12rem; margin: .5rem 0rem;"></a-progress>
                            </div>
                        </div>
                        <div class="project-details-component__main-container__info__details__fields__rack" style="margin: 0rem 0rem 1rem;"> 
                            <label for="incharge_name" class="input-label" style="margin-top: 2rem;">Temple Incharge</label>
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <span style="position: relative;">
                                    <input :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="incharge_name" v-model="projectData.incharge_name" type="text" class="input-field" style="font-size: 1rem; padding-left: 2.25rem;">
                                    <img class="input-field-icon" src="@/assets/name-icon.png"/>
                                </span>
                                <input :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="temple_incharge_name_tamil" v-model="projectData.temple_incharge_name_tamil" type="text" class="input-field" style="font-size: 1rem; padding-left: 2.25rem;"/>
                            </div>
                            <div class="project-details-component__main-container__info__details__fields__rack__input">
                                <span style="position: relative;">
                                    <vue-tel-input :disabled="!isEditAll" :class="{ 'edit-mode-on__border': isEditAll }" id="incharge_mobile_number" mode='international'  v-model="projectData.incharge_mobile_number" class="input-field-phone"></vue-tel-input>
                                    <img class="input-field-icon" src="@/assets/call-icon.png"/>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- Activity form -->
                <ActivityForm :projectData="projectData" @reloadProjectDetails="getProjectDetailsById()"/>
            </div>
            <!-- Document displaying container -->
            <div class="project-details-component__main-container__doc">
                <!-- Scrap & Delete -->
                <div class="project-details-component__main-container__doc__scrap">
                    <span @click.prevent="openScrapControl" class="project-details-component__main-container__doc__scrap__span"><img class="project-details-component__main-container__doc__scrap__btn" id="scrap" src="@/assets/vertical-menu.png"/></span>
                    <div @click.prevent="scrapConfirmControl" v-show="openScrap && projectData.status != 'scrapped'" class="project-details-component__main-container__doc__scrap__drop-down">
                        <img class="project-details-component__main-container__doc__scrap__drop-down__icon" src="@/assets/trash.png"/>
                        <p class="project-details-component__main-container__doc__scrap__drop-down__txt">Scrap project</p>
                    </div>
                    <div @click.prevent="scrapConfirmControl" v-show="openScrap && projectData.status == 'scrapped'" class="project-details-component__main-container__doc__scrap__drop-down">
                        <img class="project-details-component__main-container__doc__scrap__drop-down__icon" src="@/assets/delete.png"/>
                        <p class="project-details-component__main-container__doc__scrap__drop-down__txt">Delete project</p>
                    </div>
                    <!-- Scrap form -->
                    <div v-show="scrapConfirm && projectData.status != 'scrapped'" class="project-details-component__main-container__doc__scrap__confirm">
                        <form class="project-details-component__main-container__doc__scrap__confirm__form">
                            <div class="project-details-component__main-container__doc__scrap__confirm__form__title"><p style="display: flex; align-items: center;"><img class="project-details-component__main-container__doc__scrap__confirm__form__title__icon" src="@/assets/blue-trash.png"/>Scrap project</p><img @click.prevent="scrapClose" style="width: 1.5rem; height: 1.5rem; cursor: pointer;" src="@/assets/x.png"/></div>
                            <p class="project-details-component__main-container__doc__scrap__confirm__form__description">Are you sure to the project? the project will be temporarily removed from the platform</p>
                            <div class="project-details-component__main-container__doc__scrap__confirm__form__project-details">
                                <p class="project-details-component__main-container__doc__scrap__confirm__form__project-details__name">{{ projectData.name }}</p>
                                <p class="project-details-component__main-container__doc__scrap__confirm__form__project-details__location">{{ projectData.location }}</p>
                            </div>
                            <p class="project-details-component__main-container__doc__scrap__confirm__form__reason">Reason</p>
                            <textarea id="scrapReason" v-model="scrapReason" class="project-details-component__main-container__doc__scrap__confirm__form__reason-input"></textarea>
                            <button  @click.prevent="scrapProject" class="project-details-component__main-container__doc__scrap__confirm__form__reason-btn">Scrap project</button>
                        </form>
                    </div>
                    <!-- Delete form -->
                    <div v-show="scrapConfirm && projectData.status == 'scrapped'" class="project-details-component__main-container__doc__scrap__confirm">
                        <form class="project-details-component__main-container__doc__scrap__confirm__form">
                            <div class="project-details-component__main-container__doc__scrap__confirm__form__title"><p style="display: flex; align-items: center;"><img class="project-details-component__main-container__doc__scrap__confirm__form__title__icon" src="@/assets/blue-delete.png"/>Delete project</p><img @click.prevent="scrapClose" style="width: 1.5rem; height: 1.5rem; cursor: pointer;" src="@/assets/x.png"/></div>
                            <p class="project-details-component__main-container__doc__scrap__confirm__form__description">Are you sure to delete the project? the project will be permanently removed from the platform</p>
                            <div class="project-details-component__main-container__doc__scrap__confirm__form__project-details">
                                <p class="project-details-component__main-container__doc__scrap__confirm__form__project-details__name">{{ projectData.name }}</p>
                                <p class="project-details-component__main-container__doc__scrap__confirm__form__project-details__location">{{ projectData.location }}</p>
                            </div>
                            <button @click.prevent="deleteProject" class="project-details-component__main-container__doc__scrap__confirm__form__reason-btn">Delete project</button>
                        </form>
                    </div>
                </div>
                <!-- Status manager -->
                <div class="project-details-component__main-container__doc__status">
                    <span style="display: flex; justify-content: space-between;">
                        <p class="project-details-component__main-container__doc__status__title">Status</p>
                        <span v-show="isConfirm">
                            <img @click="updateStatus(nextStatus)" class="project-details-component__main-container__doc__status__title__control" src="@/assets/done-icon.png"/>
                            <img @click="isConfirm = false; this.getProjectDetailsById()" class="project-details-component__main-container__doc__status__title__control" src="@/assets/close-icon.png"/>
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
                        <form class="project-details-component__main-container__doc__status__planned__form" @submit.prevent="setPlan">
                            <div class="project-details-component__main-container__doc__status__planned__form__title"><p style="display: flex; align-items: center;">Update Project Details</p><img @click.prevent="plannedForm = false; this.getProjectDetailsById()" style="width: 1.5rem; height: 1.5rem; cursor: pointer;" src="@/assets/x.png"/></div>
                            <div class="project-details-component__main-container__doc__status__planned__form__date">
                                <div class="project-details-component__main-container__doc__status__planned__form__date__input">
                                    <label class="plan-input-label">Planned Start Date</label>
                                    <input type="date" style="background-color: white;" v-model="planStartDate" class="plan-input-field" placeholder="Select start date" format="DD/MM/YYYY" />
                                </div>
                                <div class="project-details-component__main-container__doc__status__planned__form__date__input">
                                    <label class="plan-input-label">Planned End Date</label>
                                    <input type="date" style="background-color: white;" v-model="planEndDate" class="plan-input-field" placeholder="Select end date" format="DD/MM/YYYY" />
                                </div>
                            </div>
                            <label class="plan-input-label">Estimated Amount</label>
                            <span style="position: relative;">
                                <input type="text" placeholder="Enter estimated amount" v-model="estimatedPlanAmount" class="project-details-component__main-container__doc__status__planned__form__amount"/>
                                <img class="project-details-component__main-container__doc__status__planned__form__rupee-img" src="@/assets/rupee.png"/>
                            </span>
                            <button type="submit" class="project-details-component__main-container__doc__status__planned__update-btn">Update project</button>
                        </form>
                    </div>
                    <!-- Completed status form -->
                    <div v-show="completeForm" class="project-details-component__main-container__doc__status__completed">
                        <form class="project-details-component__main-container__doc__status__completed__form" @submit.prevent="updateStatus(nextStatus)">
                            <div class="project-details-component__main-container__doc__status__completed__form__title"><p style="display: flex; align-items: center;">Complete Project</p><img @click.prevent="completeForm = false;  this.getProjectDetailsById()" style="width: 1.5rem; height: 1.5rem; cursor: pointer;" src="@/assets/x.png"/></div>
                            <p class="project-details-component__main-container__doc__status__completed__form__description">Once page is moved to completed, you cannot edit anything. Please ensure data is fully correct</p>
                            <div class="project-details-component__main-container__doc__status__completed__form__project-details">
                                <p class="project-details-component__main-container__doc__status__completed__form__project-details__name">{{ projectData.name }}</p>
                                <p class="project-details-component__main-container__doc__status__completed__form__project-details__location">{{ projectData.location }}</p>
                            </div>
                            <button type="submit" class="project-details-component__main-container__doc__status__completed__update-btn">Confirm</button>
                        </form>
                    </div>
                </div>
                <!-- Location form -->
                <LocationForm :projectData="projectData" :center="center" @reloadProjectDetails="getProjectDetailsById()"/>
                <!-- Document form -->
                <DocumentForm :projectData="projectData"/>
                <!-- Subscriber form -->
                <div class="subscribe-form">
                    <p class="subscribe-form__title">0 Subscriptions</p>
                    <p class="subscribe-form__description">Donors who subscribed to this project</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectService from '@/services/ProjectService';
import { ref } from 'vue';
import ActivityForm from '@/components/projectDetails/activityForm/index.vue';
import DocumentForm from '@/components/projectDetails/documentForm/index.vue';
import LocationForm from '@/components/projectDetails/locationForm/index.vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
export default{
    name: 'ProjectDetails',
    components:{
        ActivityForm,
        DocumentForm,
        LocationForm,
        VueTelInput,
    },
    mounted(){
        this.getProjectId();
        this.getProjectDetailsById(this.projectId);
    },
    setup(){
        const projectId = ref();
        const projectData = ref({});
        const isEditAll = ref(false);
        const isEditName = ref(false);
        const isComplete = ref(false);
        const selectStatus = ref(false);
        const openScrap = ref(false);
        const scrapConfirm = ref(false);
        const scrapReason = ref('');
        const completeForm = ref(false);
        const isConfirm = ref(false);
        const plannedForm = ref(false);
        const planStartDate = ref();
        const planEndDate = ref();
        const estimatedPlanAmount = ref();
        const updateDate = ref();
        const updateMonth = ref();
        const nextStatus = ref('');
        const imageCount = ref(0);
        const center = ref({});
        const newCenter = ref({});
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
            projectId,
            projectData,
            nextStatus,
            statusType,
            isEditAll,
            isEditName,
            isComplete,
            selectStatus,
            scrapConfirm,
            scrapReason,
            plannedForm,
            planStartDate,
            planEndDate,
            estimatedPlanAmount,
            completeForm,
            isConfirm,
            openScrap,
            updateDate,
            updateMonth,
            imageCount,
            center,
            newCenter,
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
                this.projectData['incharge_mobile_number'] = (this.projectData['incharge_mobile_number'] === null ? '' : this.projectData['incharge_mobile_number']);
                this.projectData['start_date'] = this.formatDate(this.projectData['start_date']);
                this.projectData['end_date'] = this.formatDate(this.projectData['end_date']);
                if(this.projectData.lat !== null && this.projectData.long !== null){
                        this.center = {
                        lat: this.projectData.lat,
                        lng: this.projectData.long,
                    };
                }
                else{
                    this.center = {
                        lat: 28.644800,
                        lng: 77.216721,
                    };
                }
            }
        },
        async updateName(){
            this.editNameControl();
            const newData = {
                name: this.projectData.name,
                temple_name_tamil: this.projectData.temple_name_tamil,
            };
            const response = await ProjectService.updateProject(this.projectId, newData);
            if(response && response.status == 200){
                this.getProjectDetailsById();
            }
        },
        async updateDetails(){
            this.editAllControl();
            const newData ={
                end_date: this.projectData.end_date,
                estimated_amt: this.projectData.estimated_amt,
                expensed_amt: this.projectData.expensed_amt,
                incharge_mobile_number: this.projectData.incharge_mobile_number,
                incharge_name: this.projectData.incharge_name,
                reg_number: this.projectData.reg_number,
                start_date: this.projectData.start_date,
                temple_incharge_name_tamil: this.projectData.temple_incharge_name_tamil,
            }
            const response = await ProjectService.updateProject(this.projectId, newData);
            if(response && response.status == 200){
                this.getProjectDetailsById();
            }
        },
        async onFileLoad(event){
            const selectedImage = event.target.files[0];
            if(selectedImage){
                const response = await ProjectService.uploadImage(this.projectId,selectedImage);
                if(response && response.status == 200){
                    this.getProjectDetailsById();
                }
            }
        },
        async scrapProject(){
            const newData = {
                reason: this.scrapReason,
                status: 'scrapped',
            }
            const response = await ProjectService.updateProject(this.projectId, newData);
            if(response && response.status == 200){
                this.scrapClose();
                this.getProjectDetailsById();
            }
        },
        async deleteProject(){
            const response = await ProjectService.deleteProject(this.projectId);
            if(response && response.status == 204){
                this.scrapClose();
                this.goToProjects();
            }
        },
        async setPlan(){
            const newData = {
                end_date: this.planStartDate,
                estimated_amt: this.estimatedPlanAmount,
                start_date: this.planEndDate,
                status: this.nextStatus,
            }
            const response = await ProjectService.updateProject(this.projectId, newData);
            if(response && response.status == 200){
                this.plannedForm = false;
                this.getProjectDetailsById();
            }
        },
        async updateStatus(newStatus){
            const newData = {
                status: newStatus.toLowerCase(),
            }
            const response = await ProjectService.updateProject(this.projectId, newData);
            if(response && response.status == 200){
                this.isConfirm = false;
                this.completeForm = false;
                this.getProjectDetailsById();
            }
        },
        changeStatus(){
            if(this.nextStatus == 'proposed'){
                this.projectData.status = this.nextStatus;
                this.setStatusStyles(this.projectData.status);
                this.isConfirm = true;
                this.selectStatus = false;
            }
            else if(this.nextStatus == 'planned'){
                this.projectData.status = this.nextStatus;
                this.setStatusStyles(this.projectData.status);
                this.plannedForm = true;
                this.selectStatus = false;
            }
            else if(this.nextStatus == 'active'){
                this.projectData.status = this.nextStatus;
                this.setStatusStyles(this.projectData.status);
                this.isConfirm = true;
                this.selectStatus = false;
            }
            else if(this.nextStatus == 'completed'){
                this.projectData.status = this.nextStatus;
                this.setStatusStyles(this.projectData.status);
                this.completeForm = true;
                this.selectStatus = false;
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
                if (statusBtn && statusInfo.bg) {
                    statusBtn.style.backgroundColor = statusInfo.bg;
                }
                if(statusTxt && statusInfo.txt){
                    statusTxt.style.color = statusInfo.txt;
                }
                if(statusDot && statusInfo.txt){
                    statusDot.style.backgroundColor = statusInfo.txt;
                }
            }
        },
        setNextStatusStyles(nextStatus){
            const nextDot = document.querySelector(".project-details-component__main-container__doc__status__btn__drop-down__dot");
            const nextBtn = document.querySelector(".project-details-component__main-container__doc__status__btn__drop-down__txt");

            if (nextStatus in this.statusType) {
                const nextStatusInfo = this.statusType[nextStatus];
                if(nextBtn && nextStatusInfo.txt){
                    nextBtn.style.color = nextStatusInfo.txt;
                }
                if(nextDot && nextStatusInfo.txt){
                    nextDot.style.backgroundColor = nextStatusInfo.txt;
                }
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
            this.scrapConfirm = false;
            this.openScrap = false;
        },
        formatDate(timestamp) {
            if(timestamp !== null){
                const dateObj = new Date(timestamp);
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is zero-based
                const day = String(dateObj.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            return null;
        },
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