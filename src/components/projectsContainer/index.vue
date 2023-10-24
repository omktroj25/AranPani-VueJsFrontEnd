<template>
    <div class="project-container" v-show="isProjectContainer">
        <div class="project-container__title">
            <p class="project-container__title__project">Project<img class="project-container__title__add-project__btn" src="@/assets/add-icon.png"/></p>
            <p class="project-container__title__suggestions"><img class="project-container__title__suggestions__icon" src="@/assets/project-suggest.png"/>Project Suggestions<span class="project-container__title__suggestions__icon__count">0</span></p>
        </div>
        <div class="project-container__navbar">
            <ul>
                <span v-for="option in projStatusNav" :key="option" :id="option" class="project-container__navbar__option" :class="{ 'project-navbar-selected': option === selectedStatus }" @click.prevent="debouncedSelectStatus(option)">{{ option }}</span>
            </ul>
        </div>
        <div class="project-container__analysis">
            <p class="project-container__analysis__count"><span style="margin-right: .2rem; font-weight: bold;">{{ projectCount }}</span>{{ selectedStatus }} Project(s)</p>
            <input class="project-container__analysis__search-bar" type="text" v-model="search" id="searchBar" placeholder="Search by reg no., name, phone number …." @input.prevent="debouncedSelectStatus(selectedStatus,search)"/>
            <img class="project-container__analysis__search-icon" src="@/assets/search-icon.png"/>
        </div>
        <div class="project-container__entry">
            <div v-show="debounceLoading" class="project-container__debounce-loading">
                <a-spin style="position: absolute; top: 10rem;"/>
            </div>
            <table style="width: 100%;">
                <tr>
                    <th class="project-container__entry__title">
                        <td v-for="option in (selectedStatus === 'Proposed' ? proposedHead : allHead)" :key="option" :id="option">{{ option }}</td>
                    </th>
                </tr>
                <tr class="project-container__entry__data" v-for="project in projectData.projects" :key="project.id" :id="project.id" @click.prevent="goToProject(project.id)">
                    <td v-for="dataKey in (selectedStatus === 'Proposed' ? proposedData : allData)" :key="dataKey">
                        <span v-if="dataKey === 'progress'">
                        <a-progress :percent="30" size="small" strokeColor="#83b85c" style="width: 4rem;"></a-progress>
                        </span>
                        <span v-else>
                            {{ preprocessData(project, dataKey) }}
                        </span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="project-container__footer" v-if="projectCount !== 0 && debounceLoading === false">
            <p class="project-container__analysis__count">Showing {{ startEntry }} - {{ endEntry }} of {{ projectCount }}</p>
            <a-pagination v-model:current="requiredPage" v-model:pageSize="entries" :total="projectCount" show-less-items/>
        </div>
        <a-empty v-if="donorCount == 0" :image="simpleImage" class="project-container__no-data"/>
    </div>
    <router-view v-show="isProjectDetails"></router-view>
</template>

<script>
import { ref, computed } from 'vue';
import ProjectService from '@/services/ProjectService';
import { Empty } from 'ant-design-vue';
import Debounce from 'lodash/debounce';
export default{
    name: 'ProjectsSection',
    beforeCreate() {
        this.debouncedSelectStatus = Debounce((selectedStatusValue, searchValue, pageValue) => {
            this.selectStatus(selectedStatusValue, searchValue, pageValue);
            this.debounceLoading=true;
        }, 300);
    },
    mounted() {
        this.debouncedSelectStatus(this.selectedStatus,this.search);
    },
    setup(){
        const isProjectContainer = ref(true);
        const isProjectDetails = ref(false);
        const debounceLoading = ref(false);
        const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
        const entries = ref(50);
        const search = ref('');
        const requiredPage = ref(1);
        const totalPage = ref(0);
        const projectCount = ref(0);
        const projectData = ref({});
        const selectedStatus =ref('Proposed');
        const projStatusNav=[
                'All',
                'Proposed',
                'Planned',
                'Active',
                'Completed',
                'Scrapped',
            ];
        const proposedHead=[
                'Reg Number',
                'Temple Name',
                'Location',
                'Created On'
            ];
        const allHead=[
                'Reg Number',
                'Temple Name',
                'Location',
                'Start Date',
                'End Date',
                'Estimated Amount',
                'Expensed Amount',
                'Progress',
            ];
        const proposedData=[
                'reg_number',
                'name',
                'location',
                'created_at',
            ];
        const allData=[
                'reg_number',
                'name',
                'location',
                'start_date',
                'end_date',
                'estimated_amt',
                'expensed_amt',
                'progress'
            ];
        const startEntry = computed(() => {
            return ((requiredPage.value - 1) * entries.value + 1);
        });
        const endEntry = computed(() => {
            return Math.min(requiredPage.value * entries.value, projectCount.value);
        });
        return{
            isProjectContainer,
            isProjectDetails,
            debounceLoading,
            simpleImage,
            entries,
            search,
            projStatusNav,
            proposedHead,
            allHead,
            proposedData,
            allData,
            selectedStatus,
            projectData,
            projectCount,
            requiredPage,
            startEntry,
            endEntry,
            totalPage,
        };
    },
    methods:{
        async selectStatus(option, search, page = 1) {
            this.isProjectDetails = false;
            this.isProjectContainer = true;
            const response =  await ProjectService.searchProject(option,search,page);
            if(response && response.status == 200){
                this.projectData = response.data;
                this.projectCount = this.projectData['total_record_count'];
                this.totalPage = this.projectData['total_number_of_pages'];
                this.requiredPage = this.projectData['current_page'];
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
            if (this.selectedStatus) {
                // To remove the class from the previous option
                this.selectedStatus = null;
            }
            this.selectedStatus = option;
        },
        goToProject(projectId){
            this.isProjectContainer = false;
            this.isProjectDetails = true;
            this.$router.push(`/projects/${projectId}`);
        },
        preprocessData(project, dataKey) {
            if( dataKey == 'created_at' || dataKey == 'start_date' || dataKey == 'end_date' ){
                return this.formatDateString(project[dataKey]);
            }
            if( dataKey === 'estimated_amt' || dataKey === 'expensed_amt'){
                return this.roundToInteger(project[dataKey]);
            }
            // For other dataKeys, return the original value
            return project[dataKey];
        },
        formatDateString(dateString) {
            const date = new Date(dateString);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            // Ensure two-digit formatting
            const formattedDay = String(day).padStart(2, "0");
            const formattedMonth = String(month).padStart(2, "0");

            return `${formattedDay}/${formattedMonth}/${year}`;
        },
        roundToInteger(number) {
            const roundedValue = Math.round(number);
            return roundedValue !== 0 ? roundedValue.toString() : '';
        },
    },
    watch: {
        requiredPage(newPage) {
            this.debouncedSelectStatus(this.selectedStatus, this.search, newPage);
        },
    },
};
</script>

<style>
@import '@/components/projectsContainer/style.scss';
</style>