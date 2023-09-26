import Axios from 'axios';
import { Store } from '@/main';
import Notify from '@/services/NotificationService';
import Router from '@/router/index';

const API_URL = 'https://api.uat.aranpani.in/api/v1/meta';

export default{
    name: 'MetaService',

    // Get countries meta data
    async getCountries(){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/countries`;
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

    // Get state meta data
    async getStates(countryId: number){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/states`;
            const response = await Axios.get(url,{
                headers: authData,
                params:{
                    country_id: countryId,
                },
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

    // Get cities meta data
    async getCities(stateId: number){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/cities`;
            const response = await Axios.get(url,{
                headers: authData,
                params:{
                    state_id: stateId,
                },
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

    // Get identification cards meta data
    async getIdentificationCards(){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/identification_cards`;
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

    // Get identification cards meta data
    async getGender(){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/genders`;
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

    // Get subscription schemes meta data
    async getSubscriptionSchemes(){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/subscription_schemes`;
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