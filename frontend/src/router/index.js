import Vue            from 'vue';
import VueRouter      from 'vue-router';
import Settings       from '../views/settings/settings.view';
import Login          from '../views/login/login.view.vue';
import ProjectList    from '../views/project-list/project-list.view.vue';
import EmployeeList   from '../views/employee-list/employee-list.view.vue';
import EmployeeDetail from '../views/employee-detail/employee-detail.view.vue';
import MainContentApp from '../views/main-content-app/main-content-app.view.vue';

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
        component: ProjectList,
      },
      {
        path: 'employee-detail/:uuid',
        name: 'Employee detail',
        component: EmployeeDetail,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings,
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
