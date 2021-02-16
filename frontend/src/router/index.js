import Vue            from 'vue';
import axios          from 'axios';
import VueRouter      from 'vue-router';
import store          from '../store/store';
import Login          from '../views/login/login.view.vue';
import Settings       from '../views/settings/settings.view';
import Registration   from '../views/registration/registration.view';
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
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

axios.interceptors.request.use((config) => {
  if (config.url.includes('signIn') || config.url.includes('registration')) {
    return config;
  } else {
    const token = store.getters[ 'token' ];
    config.headers[ 'authorization' ] = `${token}`;
    return config;
  }
});

axios.interceptors.response.use((config) => {
    return config;
  }, async (error) => {
    if ([ 401, 403 ].includes(error.response.status) && router.currentRoute.name !== 'Login' && router.currentRoute.name !== 'Registration') {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      store.commit('setUser', {});
      await router.push({ name: 'Login' }).catch(() => {
      });
    } else if (error.response.status.toString().startsWith('5') && [ 502, 504 ].includes(error.response.status)) {
      await router.push({ name: 'Login' }).catch(() => {
        },
      );
    }

    return Promise.reject(error);
  },
);

export default router;
