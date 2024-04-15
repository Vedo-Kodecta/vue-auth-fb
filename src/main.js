// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// eslint-disable-next-line no-unused-vars
import firebase from '@/firebase';

createApp(App).use(router).mount('#app');
