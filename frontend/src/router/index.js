import Vue            from 'vue';
import VueRouter      from 'vue-router';
import Login          from '../views/login/login.view.vue';
import MainContentApp from '../views/main-content-app/main-content-app.view.vue';
import EmployeeList   from '../views/employee-list/employee-list.view.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/employees-list',
    component: MainContentApp,
    children: [
      {
        path: 'employees-list',
        name: 'Employees list',
        component: EmployeeList,
      },
      {
        path: 'projects-list',
        name: 'Projects list',
        component: EmployeeList,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
