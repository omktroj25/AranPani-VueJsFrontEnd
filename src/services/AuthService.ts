import Axios from 'axios';
import { User } from '@/models/UserModel';
import { AuthData } from '@/models/AuthDataModel';
import { Store } from '@/main';
import Notify from '@/services/NotificationService';
import Router from '@/router/index';

const apiUrl = 'https://api.uat.aranpani.in/api/v1/users/sign_in';

export default{
    name: 'AuthService',
    async login(email: string, password:string){
        const userData: User = {
            email: email,
            password: password,
        };
        const requestData ={
            user: userData,
        };
        const maxRetries = 5;
        let retries = 0;
        while (retries < maxRetries) {
            try{
                const response = await Axios.post(apiUrl,requestData);
                if(response.status == 200){
                    // Validate and extract the required data from the response
                    const authData: AuthData = {
                        'access-token': response.headers['access-token'],
                        'client': response.headers['client'],
                        'uid': response.headers['uid'],
                        'token-type': 'Bearer',
                    };
                    // Store the extracted data in local storage
                    localStorage.removeItem('authData');
                    localStorage.setItem('authData', JSON.stringify(authData));
                    Store.commit('setAuthData',authData);
                    
                    Notify.createNotification('success','Success','User logged in successfully');
                    Router.push('/projects');
                    return true;
                }
            }
            catch (error: any) {
                localStorage.removeItem('authData');
                Store.commit('setAuthData',{});
                if(error.response && error.response.status){
                    Notify.createNotification('error', `${error.response.status} Error`, error.response.data.error);
                    return false;
                }
                else{
                    retries++;
                    Notify.createNotification('warning','Warning','Taking longer time than usual. Check your internet connection');
                    if (retries < maxRetries) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                    else {
                        Notify.createNotification('error','Error','Maximum tries reached. Unable to reach the server. Check the internet connection and try after sometime');
                        return false;
                    }
                }
            }
        }
    },
};