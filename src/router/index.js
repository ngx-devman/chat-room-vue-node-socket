import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../components/LogIn.vue'),
    },
    {
        path: '/signup',
        component: () => import('../components/SignUp.vue'),
    },
    {
        path: '/chat',
        component: () => import('../pages/ChatPage.vue'),
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router