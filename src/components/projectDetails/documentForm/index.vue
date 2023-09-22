<template>
    <div class="doc-form">
        <span v-if="projectData !== null ? previewDoc = projectData.project_documents : previewDoc = []"></span>
        <p class="doc-form__title">Documents</p>
        <p class="doc-form__description">Add documents related to project</p>
        <div v-for="doc in previewDoc" :key="doc.id" class="doc-form__preview">
            <embed v-if="doc.document_url != null" :id="doc.id" :src="doc.document_url" class="doc-form__doc"/>
        </div>
        <div class="doc-form__preview">
            <label for="document-upload">
                <img src="@/assets/upload-doc-form.png" class="doc-form__doc">
            </label>
            <input type="file" accept="application/pdf" @change="attachDocument" id="document-upload" style="display: none;">
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import ProjectService from '@/services/ProjectService';
export default{
    name: 'DocumentForm',
    props:{
        projectData:{
            type: Object,
            required: true,
        }
    },
    setup(){
        const previewDoc = ref([]);
        return{
            previewDoc,
        }
    },
    methods:{
        async attachDocument(event){
            if(this.projectData){
                const selectedImage = event.target.files[0];
                const response = await ProjectService.uploadDocument(this.projectData.id, selectedImage);
                if(response && response.status == 200){
                    this.previewDoc.push(response.data.project_document);
                }
            }
        }
    }
}
</script>

<style>
@import '@/components/projectDetails/documentForm/style.scss';
</style>