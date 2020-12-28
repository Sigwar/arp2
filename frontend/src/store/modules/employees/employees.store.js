import axios from 'axios';
import store from '../../store';

const state = {
  employees: [],
  sort: {
    statusSearch: [ 1, 0 ],
    sortBy: 'NAME',
    direction: 'ASC',
  },
  isModalOpen: false,
  employeeForm: {
    name: '',
    lastName: '',
    level: '',
    profession: '',
    birthday: '',
    itExperience: '',
    languages: [],
    isActive: true,
    itKnowledge: [],
    projects: '',
    loadingBtn: false,
  },
  projects: [],
};

// getters
const getters = {
  employees: (state) => {
    return state.employees;
  },
  sort: (state) => {
    return state.sort;
  },
  isModalOpen: (state) => {
    return state.isModalOpen;
  },
  projects: (state) => {
    return state.projects;
  },
  statusSearch: (state) => {
    return state.statusSearch;
  },
  loadingBtn: (state) => {
    return state.loadingBtn;
  },
};

// actions
const actions = {
  async getEmployees({ state, commit }) {

    const reqData = {
      userUuid: store.getters[ 'userUuid' ],
      ...state.sort,
    };

    try {
      const { data } = await axios.post('http://localhost:8081/employees/employees', reqData);
      commit('setEmployees', data);
    } catch (e) {
      console.error(e);
    }
  },
  async createNewEmployee({ state, commit, dispatch }) {
    commit('setLoadingBtn', true);
    const reqData = {
      userUuid: store.getters[ 'userUuid' ],
      ...state.employeeForm,
    };

    try {
      await axios.post('http://localhost:8081/employee/create', reqData);
      dispatch('getEmployees');
      commit('setIsModalOpen', false);
      commit('resetEmployeeForm');
      commit('setLoadingBtn', false);
      dispatch('notify/openNotifySuccess', 'Employee has been created', { root: true });
    } catch (e) {
      commit('setLoadingBtn', false);
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },
  async getProjects({ commit }) {
    const uuid = store.getters[ 'userUuid' ];
    try {
      const { data } = await axios.post('http://localhost:8081/projects/projectsList', { userUuid: uuid });
      commit('setProjects', data);
    } catch (e) {
      console.error(e);
    }
  },
};

// mutations
const mutations = {
  setEmployees: (state, payload) => {
    state.employees = payload;
  },
  setLoadingBtn: (state, payload) => {
    state.loadingBtn = payload;
  },
  setSort: (state, payload) => {
    if (state.sort.sortBy === payload) {
      state.sort.direction = state.sort.direction === 'ASC' ? 'DESC' : 'ASC';
    } else {
      state.sort.sortBy = payload;
    }
  },
  setStatusSearch: (state, payload) => {
    if (payload.active && payload.inactive) state.sort.statusSearch = [ 1, 0 ];
    else if (payload.active && !payload.inactive) state.sort.statusSearch = [ 1 ];
    else state.sort.statusSearch = [ 0 ];
  },
  setIsModalOpen: (state, payload) => {
    state.isModalOpen = payload;
  },
  setEmployeeForm: (state, payload) => {
    state.employeeForm = payload;
  },
  resetEmployeeForm: (state) => {
    state.employeeForm = {
      name: '',
      lastName: '',
      birthday: '',
      itExperience: '',
      languages: '',
      isActive: true,
      itKnowledge: [],
    };
  },
  setProjects: (state, payload) => {
    state.projects = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};