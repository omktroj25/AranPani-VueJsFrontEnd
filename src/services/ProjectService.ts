import Axios from 'axios';
import { Store } from '@/main';
import Notify from '@/services/NotificationService';
import Router from '@/router/index';

const apiUrl = 'https://api.uat.aranpani.in/api/v1/admin/projects';

export default{
    name: 'ProjectService',
    async searchProject(selectedStatus: string, search: string = '', requiredPage: number = 1, entryLimit: number = 50){
        try{
            if (!['Proposed', 'Planned', 'Active', 'Completed', 'Scrapped'].includes(selectedStatus)) {
                selectedStatus = '';
            }
            const authData = Store.state.authHeaderData; 
            const response = await Axios.get(apiUrl,{
                params:{
                    status: selectedStatus.toLowerCase(),
                    page: requiredPage,
                    search: search,
                    limit: entryLimit,
                },
                headers: authData,
            });
            return response;
        }
        catch (error: any) {
            if(error.response && error.response.status){
                if(error.response.status == 401){
                    localStorage.removeItem('authData');
                    Store.commit('setAuthData',{});
                    Notify.createNotification('error',`${error.response.status} Error`,error.response.data.errors);
                    Router.push('/auth/login');
                    return false;
                }
                else{
                    Notify.createNotification('error',`${error.response.status} Error`,error.response.data.errors);
                    return false;
                }
            }
            Notify.createNotification('error','Error','Unable to reach the server. Check the internet connection and try after sometime');
            return false;
        }
    }
};