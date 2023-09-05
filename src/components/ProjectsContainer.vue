<template> 
    <div class="project-container">
        <div class="project-container__title">
            <p class="project-container__title__project">Project<img class="project-container__title__add-project__btn" src="@/assets/add-icon.png"/></p>
            <p class="project-container__title__suggestions"><img class="project-container__title__suggestions__icon" src="@/assets/project-suggest.png"/>Project Suggestions<span class="project-container__title__suggestions__icon__count">0</span></p>
        </div>
        <div class="project-container__navbar">
            <ul>
                <span v-for="option in projStatusNav" :key="option" :id="option" class="project-container__navbar__option" :class="{ 'project-navbar-selected': option === selectedStatus }" @click="selectStatus(option)">{{ option }}</span>
            </ul>
        </div>
        <div class="project-container__analysis">
            <p class="project-container__analysis__count"><span style="margin-right: .2rem; font-weight: bold;">{{ projectCount }}</span>{{ selectedStatus }} Project(s)</p>
            <input class="project-container__analysis__search-bar" type="text" id="searchBar" placeholder="Search by reg no., name, phone number …."/>
            <img class="project-container__analysis__search-icon" src="@/assets/search-icon.png"/>
        </div>
        <div class="project-container__entry">
            <table style="width: 100%;">
                <tr>
                    <th class="project-container__entry__title">
                        <td v-for="option in (selectedStatus === 'Proposed' ? proposedHead : allHead)" :key="option" :id="option">{{ option }}</td>
                    </th>
                </tr>
                <tr class="project-container__entry__data">
                </tr>
                
            </table>
        </div>
        <div class="project-container__footer">
            <p class="project-container__analysis__count">Showing {{ startPage }} - {{ endPage }} of {{ projectCount }}</p>
            <div class="project-container__analysis__count">
                <img class="project-container__footer__arrow-img" src="@/assets/arrow-left.png"/>
                <div class="project-container__footer__selected-page">{{ page }}</div>
                <img class="project-container__footer__arrow-img" src="@/assets/arrow-right.png"/>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'ProjectsSection',
    data(){
        return{
            projStatusNav:[
                'Proposed',
                'Planned',
                'Active',
                'Completed',
                'Scrapped',
            ],
            proposedHead:[
                'Reg Number',
                'Temple Name',
                'Location',
                'Created On'
            ],
            allHead:[
                'Reg Number',
                'Temple Name',
                'Location',
                'Start Date',
                'End Date',
                'Estimated Amount',
                'Expensed Amount',
                'Progress',
            ],
            selectedStatus: 'Proposed',
            projectCount: '00',
            startPage: '00',
            endPage: '00',
            page: '1',
        };
    },
    methods:{
        selectStatus(option) {
            if (this.selectedStatus) {
                // To remove the class from the previous option
                this.selectedStatus = null;
            }
            this.selectedStatus = option;
        },
    },
};
</script>

<style>
@import '@/components/ProjectsContainer.scss';
</style>