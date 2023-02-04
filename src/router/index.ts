import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/all/1'
    },
    {
        path: '/:channel/:page',
        name: 'VTNNews',
        props: true,
        component: () => import('@/views/VTNNews.vue')
    },
    {
        path: "/:catchAll(.*)",
        name: 'VTN404', 
        component: () => import('@/views/VTN404.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
