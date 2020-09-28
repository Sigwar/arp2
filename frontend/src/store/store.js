import Vue                  from 'vue';
import Vuex                 from 'vuex';
import employeesModule      from './modules/employees/employees.store.js';
import projectsModule       from './modules/projects/projects.store.js';
import employeeDetailModule from './modules/employee-detail/employee-detail.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    global: {},
  },
  mutations: {},
  actions: {},
  modules: {
    projectsModule,
    employeesModule,
    employeeDetailModule,
  },
});
