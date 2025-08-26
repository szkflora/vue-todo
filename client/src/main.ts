import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { DatePicker } from 'primevue';
import Aura from '@primeuix/themes/aura';
import router from './router';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('DatePicker',DatePicker);
app.use(createPinia());
app.use(router).mount('#app');
