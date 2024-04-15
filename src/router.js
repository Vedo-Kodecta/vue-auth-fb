import { createRouter, createWebHistory } from 'vue-router';
import AuthForm from './components/AuthForm.vue';
import DashboardPage from './views/DashboardPage.vue';

const routes = [
  { path: '/', component: AuthForm, name: 'AuthForm' },
  { path: '/dashboard', component: DashboardPage, name: 'DashboardPage', meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log('Navigating from:', from.path);
  console.log('Navigating to:', to.path);

  const isAuthenticated = localStorage.getItem('accessToken');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'AuthForm' }); 
  } else {
    next(); 
  }
});

export default router;
