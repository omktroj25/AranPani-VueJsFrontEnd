import axios from 'axios';
import { User } from '@/models/UserModel';
import { AuthData } from '@/models/AuthDataModel';

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
                const response = await axios.post(apiUrl,JSON.stringify(requestData));
                // Validate and extract the required data from the response
                const authData: AuthData = {
                    'access-token': response.headers['access-token'],
                    'client': response.headers['client'],
                    'uid': response.headers['uid'],
                    'token-type': response.headers['token-type'],
                };
                // Store the extracted data in local storage
                localStorage.setItem('authData', JSON.stringify(authData));
                return response;
            }
            catch (error) {
                if(error.response.status == 401){
                    alert("Unauthorized user");
                    return;
                }
                else if(error.response.status == 500){
                    alert("Internal server error");
                    return;
                }
                else{
                    retries++;
                    if (retries < maxRetries) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } else {
                        console.error('Max retries reached. Unable to login.');
                        return;
                    }
                }
                console.error('Login Error');
                console.error(error);
            }
        }
    }
};