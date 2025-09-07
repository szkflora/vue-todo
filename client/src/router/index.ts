import { createRouter, createWebHistory } from 'vue-router';
import TodoView from '@/views/TodoView.vue';
import SignUpView from '@/views/SignUpView.vue';
import SignInView from '@/views/SignInView.vue';
import { jwtDecode } from 'jwt-decode';

const routes = [
  { path: '/tasks', component: TodoView },
  { path: '/signup', component: SignUpView },
  { path: '/signin', component: SignInView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem('authToken');
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      localStorage.removeItem('authToken');
    }
  } catch (err) {
    localStorage.removeItem('authToken');
  }

  if (to.path === '/') {
    return { path: '/tasks' };
  }

  if (to.path === '/tasks' && !token) {
    return { path: '/signin' };
  }

  if ((to.path === '/signup' || to.path === '/signin') && token) {
    return { path: '/tasks' };
  }
});

export default router;
