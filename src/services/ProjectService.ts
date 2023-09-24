import Axios from 'axios';
import { Store } from '@/main';
import Notify from '@/services/NotificationService';
import Router from '@/router/index';

const API_URL = 'https://api.uat.aranpani.in/api/v1/admin/projects';

export default{
    name: 'ProjectService',

    // To get all the projects list with respect to their status and search parameters
    async searchProject(selectedStatus: string, search: string = '', requiredPage: number = 1, entryLimit: number = 50){
        try{
            if (!['Proposed', 'Planned', 'Active', 'Completed', 'Scrapped'].includes(selectedStatus)) {
                selectedStatus = '';
            }
            const authData = Store.state.authHeaderData; 
            const response = await Axios.get(API_URL,{
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
    },

    // To get the individual project using the id
    async getProject(projectId: number){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/${projectId}`;
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

    // To upadate the project details
    async updateProject(projectId: number, projectData: any){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/${projectId}`;
            const response = await Axios.put(url, projectData, {
                headers: authData,
            });
            Notify.createNotification('success',`Success`, 'Project updated successfully');
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

    // To upload the image of individual project using the id
    async uploadImage(projectId: any, image: any){
        try{
            const authData = Store.state.authHeaderData;
            const url = 'https://api.uat.aranpani.in/api/v1/admin/project_attachments';
            const formData = new FormData();
            formData.append('project_id', projectId);
            formData.append('image', image);
            const response = await Axios.post(url,formData,{
                headers: {
                    ...authData,
                    'Content-Type': 'multipart/form-data',
                },
            });
            Notify.createNotification('success',`Success`, 'Image uploaded successfully');
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

    // To delete the project
    async deleteProject(projectId: any){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/${projectId}`;
            const response = await Axios.delete(url,{
                headers: authData,
            });
            Notify.createNotification('success','Success', 'Project scrapped successfully');
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

    // To attach the blog to the activity form
    async attachBlog(image: any){
        try{
            const authData = Store.state.authHeaderData;
            const url = 'https://api.uat.aranpani.in/api/v1/admin/project_blog_attachments';
            const formData = new FormData();
            formData.append('project_blog_attachment[attachment]', image);
            const response = await Axios.post(url,formData,{
                headers: {
                    ...authData,
                    'Content-Type': 'multipart/form-data',
                },
            });
            Notify.createNotification('success','Success', 'Blog attached successfully');
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

    // To upload the activity of the temple
    async uploadActivity(projectId: number, projectData: any){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/${projectId}/project_blogs`;
            const response = await Axios.post(url,projectData,{
                headers: authData,
            });
            Notify.createNotification('success',`Success`, 'Blog uploaded successfully');
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
    
    // To update the activity of the temple
    async updateActivityBlog(projectId: number, projectData: any, activityId: number){
        try{
            const authData = Store.state.authHeaderData;
            const url = `${API_URL}/${projectId}/project_blogs/${activityId}`;
            const response = await Axios.put(url,projectData,{
                headers: authData,
            });
            Notify.createNotification('success',`Success`, 'Blog updated successfully');
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

    // To upload the document of individual project using the id
    async uploadDocument(projectId: any, document: any){
        try{
            const authData = Store.state.authHeaderData;
            const url = 'https://api.uat.aranpani.in/api/v1/admin/project_documents';
            const formData = new FormData();
            formData.append('project_id', projectId);
            formData.append('document', document);
            const response = await Axios.post(url,formData,{
                headers: {
                    ...authData,
                    'Content-Type': 'multipart/form-data',
                },
            });
            Notify.createNotification('success',`Success`, 'Document uploaded successfully');
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

    // To create the new project
    async createNewProject(projectData: any){
        try{
            const authData = Store.state.authHeaderData;
            const response = await Axios.post(API_URL,projectData,{
                headers: authData,
            });
            Notify.createNotification('success',`Success`, 'Project created successfully');
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