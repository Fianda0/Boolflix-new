import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./view/AppHome.vue";
import AppFilm from "./view/AppFilm.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/films',
            name: 'films',
            component: AppFilm
        },
    ]
})

export { router };