// single pages
import Error5xx from '@/views/Error5xx.vue';
import homePage from '@/views/Home.vue';
import loginPage from '@/views/Login.vue';
import notFoundPage from '@/views/NotFound.vue';

const DOMAIN_TITLE = process.env.DOMAIN_TITLE;

export const routes = [
    {
        path: '/',
        name: 'home',
        component: homePage,
        meta: { title: `${DOMAIN_TITLE} | home` }
    },
    {
        path: '/foo',
        name: 'foo',
        component: Error5xx,
        meta: { title: `${DOMAIN_TITLE} | foo` }
    },
    {
        path: '/bar',
        name: 'bar',
        component: notFoundPage,
        meta: { title: `${DOMAIN_TITLE} | bar` }
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
