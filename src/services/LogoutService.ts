import Axios from 'axios';
import { Store } from '@/main';
import Notify from '@/services/NotificationService';
import Router from '@/router/index';

const apiUrl = 'https://api.uat.aranpani.in/api/v1/users/sign_out';

export default{
    name: 'LogoutService',
    async logout(){
        try{
            const authData = Store.state.authHeaderData; 
            const response = await Axios.delete(apiUrl,{
                headers: authData,
            });
            if(response.status == 200){
                // Remove the stored data in local storage
                localStorage.removeItem('authData');
                Store.commit('setAuthData',{});
                Notify.createNotification('success','Success','Logged out successfully');
                Router.push('/auth/login');
            }
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