// router.js

import { createRouter, createWebHistory } from 'vue-router';
import AuthForm from './components/AuthForm.vue';
import DashboardPage from './views/DashboardPage.vue';

const routes = [
  { path: '/', component: AuthForm, name: 'AuthForm'},
  { path: '/dashboard', component: DashboardPage, name: 'DashboardPage'}
];



const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log('Navigating from:', from.path);
  console.log('Navigating to:', to.path);
  next(); // Ensure to call next() to continue navigation
});

export default router;
