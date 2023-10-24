import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import Router from './router/index';
import Antdv from 'ant-design-vue';
import { AuthData } from './models/AuthDataModel';

export const Store = createStore({
    state(){
        return{
            authHeaderData: JSON.parse(localStorage.getItem('authData') as string) as AuthData,
        };
    },
    mutations:{
        setAuthData(state:any, authData:AuthData){
            state.authHeaderData = authData as AuthData;
        }
    },
});

const app = createApp(App);
app.use(Router);
app.use(Antdv);
app.use(Store);
app.mount('#app');
