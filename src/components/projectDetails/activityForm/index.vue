<template>
    <form v-show="newActivity" class="project-details-component__main-container__info__activity__container" @submit.prevent="addActivity">
        <p class="project-details-component__main-container__info__activity__container__date"><span class="project-details-component__main-container__info__activity__container__date-dot"></span>{{ new Date().toLocaleDateString() }}</p>
        <div class="project-details-component__main-container__info__activity__container__content">
            <div class="project-details-component__main-container__info__activity__container__content__img-btn">
                <div class="activity-preview-screen">
                    <span v-for="image in projectBlogAttachments" :key="image.id">
                        <embed v-if="image.image_url != null" :src="image.image_url" :id="image.id" class="activity-img"/>
                    </span>
                    <input type="file" id="new-activity-image" @change.prevent="blogUpload" style="display: none;">
                    <label for="new-activity-image">
                        <img src="@/assets/upload-activity-img.png" alt="Upload Image" class="activity-img">
                    </label>
                </div>
                <p class="activity-control-btn">
                    <button type="submit" class="activity-done-btn">Update</button>
                    <button @click.prevent="cancelActivityForm" class="activity-cancel-btn">Cancel</button>
                </p>
            </div>
            <div class="activity-description">
                <label for="description-eng" class="input-label">Description (English)</label>
                <textarea id="new-description-eng" placeholder="Type here ... " v-model="descriptionEng" class="activity-description-area"></textarea>
                <p for="new-description-eng" class="error-input" v-show="descriptionEng == ''"> Description is required </p>
            </div>
            <div class="activity-description">
                <label for="description-tam" class="input-label">விளக்கம் (தமிழ்)</label>
                <textarea id="new-description-tam" placeholder="இங்கே தட்டச்சு செய்க ... " v-model="descriptionTam" class="activity-description-area"></textarea>
                <p for="new-description-tam" class="error-input" v-show="descriptionTam == ''"> Description is required </p>
            </div>
        </div>
    </form>
    <form v-for="activity in projectData.project_blogs" :key="activity.id" class="project-details-component__main-container__info__activity__container" @submit.prevent="updateActivity(activity)" >
        <p class="project-details-component__main-container__info__activity__container__date"><span class="project-details-component__main-container__info__activity__container__date-dot"></span>{{ formatUpdateDate(activity.updated_at) }}</p>
        <div :id="activity.id" class="project-details-component__main-container__info__activity__container__content">
            <div class="project-details-component__main-container__info__activity__container__content__img-btn">
                <div class="activity-preview-screen">
                    <span v-for="image in activity.project_blog_attachments" :key="image.id">
                        <embed v-if="image.image_url != null" :src="image.image_url" :id="image.id" class="activity-img">
                    </span>
                    <input type="file" id="activity-image" @change.prevent="updateBlog($event, activity)" style="display: none;">
                    <label v-show="activity.isEditActivity" for="activity-image">
                        <img src="@/assets/upload-activity-img.png" alt="Upload Image" class="activity-img">
                    </label>
                </div>
                <p class="activity-control-btn">
                    <img v-show="activity.isEditActivity === true ? false : true" @click.prevent="editActivity(activity)" class="activity-edit-btn" src="@/assets/edit-icon.png"/>
                    <button v-show="activity.isEditActivity" type="submit" class="activity-done-btn">Update</button>
                    <button v-show="activity.isEditActivity" @click.prevent="cancelEdit(activity)" class="activity-cancel-btn">Cancel</button>
                </p>
            </div>
            <div class="activity-description">
                <label for="description-eng" class="input-label">Description (English)</label>
                <textarea :disabled="!activity.isEditActivity" id="description-eng" placeholder="Type here ... " v-model="activity.content_english" class="activity-description-area" :class="{ 'activity-view-mode': !activity.isEditActivity }"></textarea>
                <p for="description-eng" class="error-input" v-show="activity.content_english == '' && activity.isEditActivity"> Description is required </p>
            </div>
            <div class="activity-description">
                <label for="description-tam" class="input-label">விளக்கம் (தமிழ்)</label>
                <textarea :disabled="!activity.isEditActivity" id="description-tam" placeholder="இங்கே தட்டச்சு செய்க ... " v-model="activity.content_tamil" class="activity-description-area" :class="{ 'activity-view-mode': !activity.isEditActivity }"></textarea>
                <p for="description-tam" class="error-input" v-show="activity.content_english == '' && activity.isEditActivity"> Description is required </p>
            </div>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import ProjectService from '@/services/ProjectService';
export default{
    name: 'ActivityForm',
    props:{
        projectData: {
            type: Object,
            required: true, 
        },
        newActivity: Boolean,
    },
    emits:{
        newActivity: Boolean,
    },
    setup(){
        const descriptionEng = ref('');
        const descriptionTam = ref('');
        const projectBlogAttachments = ref([]);
        const projectBlogAttachmentIds = ref([]);
        return{
            descriptionEng,
            descriptionTam,
            projectBlogAttachments,
            projectBlogAttachmentIds,
        }
    },
    methods:{
        async blogUpload(event){
            const selectedImage = event.target.files[0];
            if(selectedImage){
                const response = await ProjectService.attachBlog(selectedImage);
                if(response && response.status == 200){
                    this.projectBlogAttachments.push(response.data.project_blog_attachment);
                    this.projectBlogAttachmentIds.push(response.data.project_blog_attachment.id);
                }
            }
        },
        async addActivity(){
            const newData = {
                    "project_blog": {
                        "content_english": this.descriptionEng,
                        "content_tamil": this.descriptionTam,
                        "project_blog_attachments": this.projectBlogAttachments, 
                        "project_blog_attachment_ids": this.projectBlogAttachmentIds,
                    }
                };
            const response = await ProjectService.uploadActivity(this.projectData.id, newData);
            if(response && response.status == 200){
                this.cancelActivityForm();
                this.$emit('reloadProjectDetails');
            }
            this.cancelActivityForm();
            this.$emit('reloadProjectDetails');
        },
        async updateBlog(event, activity){
            const selectedImage = event.target.files[0];
            if(selectedImage){
                const response = await ProjectService.attachBlog(selectedImage);
                if(response && response.status == 200){
                    activity.project_blog_attachments.push(response.data.project_blog_attachment);
                }
            }
        },
        async updateActivity(activity){
            activity.project_blog_attachment_ids = activity.project_blog_attachments.map(attachment => attachment.id);
            console.log(activity.project_blog_attachment_ids);
            const newData = {
                    "project_blog": {
                        "id": activity.id,
                        "content_english": activity.content_english,
                        "content_tamil": activity.content_tamil,
                        "project_blog_attachments": activity.project_blog_attachments, 
                        "project_blog_attachment_ids": activity.project_blog_attachment_ids,
                    }
                };
            const response = await ProjectService.updateActivityBlog(this.projectData.id, newData, activity.id);
            if(response && response.status == 200){
                this.cancelEdit(activity);
                this.$emit('reloadProjectDetails');
            }
            this.cancelEdit(activity);
            this.$emit('reloadProjectDetails');
        },
        cancelActivityForm(){
            this.projectBlogAttachments = [];
            this.projectBlogAttachmentIds = [];
            this.descriptionEng = [];
            this.descriptionTam = [];
            this.$emit('newActivity',false);
        },
        editActivity(activity) {
            activity.isEditActivity = true;
        },
        cancelEdit(activity) {
            activity.isEditActivity = false;
        },
        formatUpdateDate(timestamp) {
            if(timestamp !== null){
                const dateObj = new Date(timestamp);
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                return `${day}/${month}/${year}`;
            }
            return null;
        },
    },
}
</script>

<style>
@import '@/components/projectDetails/activityForm/style.scss';
</style>