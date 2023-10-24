import Axios from 'axios';
import { Store } from '@/main';
import Notify from '@/services/NotificationService';
import Router from '@/router/index';

const API_URL = 'https://api.uat.aranpani.in/api/v1/admin/donors';

export default{
    name: 'DonorService',

    // To get all the donors list with respect to search parameters
    async searchDonor(search: string = '', requiredPage: number = 1, entryLimit: number = 50){
        try{ 
            const authData = Store.state.authHeaderData; 
            const response = await Axios.get(API_URL,{
                params:{
                    page: requiredPage,
                    search: search,
                    limit: entryLimit,
                    role: 'donor',
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
    },

    // To get the area representatives
    async getRepresentatives(entryLimit: number = 50){
        try{
            const url = "https://api.uat.aranpani.in/api/v1/admin/area_representatives";
            const authData = Store.state.authHeaderData; 
            const response = await Axios.get(url,{
                params:{
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
    },

    // To assign representative
    async setRepresentatives(idData: any){
        try{
            const url = `${API_URL}/assign_representative`;
            const authData = Store.state.authHeaderData; 
            const response = await Axios.put(url,idData,{
                headers: authData,
            });
            Notify.createNotification('success',`Success`, 'Representative assigned successfully');
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
    },

    // To get the individual donor using the id
    async getDonorDetails(donorId: number){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/${donorId}`;
            const response = await Axios.get(url,{
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
    },

    // To get the payment details of the  donor using the donor id
    async getPaymentDetailsById(donorId: number){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/${donorId}/payments`;
            const response = await Axios.get(url,{
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
    },
};