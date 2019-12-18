
import axios from 'axios';
import VueRouter from "vue-router";
import App from './views/App';
import Hello from './views/Hello';
import Home from './views/Home';
import UsersIndex from "./views/UsersIndex";
import UsersEdit from "./views/UsersEdit";

window.Vue = require('vue');

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/hello',
            name: 'hello',
            component: Hello
        },
        {
            path: '/users',
            name: 'users.index',
            component: UsersIndex
        },
        {
            path: '/users/:id/edit',
            name: 'users.edit',
            component: UsersEdit
        }
    ]
});

const app = new Vue({
    el: '#app',

    components: {
        App
    },

    router,
});