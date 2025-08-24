import { createRouter, createWebHistory } from "vue-router";
import TodoView from "../views/TodoView.vue";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/SignInView.vue";

const routes = [
    { path: '/tasks', component: TodoView },
    { path: '/signup', component: SignUpView },
    { path: '/login', component: LoginView}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router