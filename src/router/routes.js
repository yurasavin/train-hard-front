// single pages
import Error5xx from '@/views/Error5xx.vue';
import homePage from '@/views/Home.vue';
import loginPage from '@/views/Login.vue';
import notFoundPage from '@/views/NotFound.vue';
import profilePage from '@/views/Profile.vue';
import programsPage from '@/views/Programs.vue';
import trainingProcessPage from '@/views/TrainingProcess.vue';

const DOMAIN_TITLE = process.env.DOMAIN_TITLE;

export const routes = [
    {
        path: '/',
        name: 'home',
        component: homePage,
        meta: { title: `${DOMAIN_TITLE} | home` }
    },
    {
        path: '/profile',
        name: 'profile',
        component: profilePage,
        meta: { title: `${DOMAIN_TITLE} | profile` }
    },
    {
        path: '/programs',
        name: 'programs',
        component: programsPage,
        meta: { title: `${DOMAIN_TITLE} | my programs` }
    },
    {
        path: '/training-process/:trainingId',
        name: 'training-process',
        component: trainingProcessPage,
        meta: { title: `${DOMAIN_TITLE} | training` },
        props: true
    },
    {
        path: '/login',
        name: 'login',
        component: loginPage,
        meta: { title: `${DOMAIN_TITLE} | login` }
    },
    {
        path: '/error',
        name: 'Error5xx',
        component: Error5xx,
        meta: { title: `${DOMAIN_TITLE} | error` }
    },
    {
        path: '*',
        component: notFoundPage,
        meta: { title: `${DOMAIN_TITLE} | not found` }
    }
];
