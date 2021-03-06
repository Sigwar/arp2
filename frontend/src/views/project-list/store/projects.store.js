import axios from 'axios';

const state = {
  isModalOpen: false,
  isDeleteModal: false,
  isEditMode: false,
  projectToDelete: {},
  projects: [],
  employees: [],
  sort: {
    sortBy: 'NAME',
    direction: 'ASC',
  },
  projectForm: {
    name: '',
    client: '',
    date: [],
    topic: '',
    description: '',
    employees: [],
  },
};

//getters
const getters = {
  projects: (state) => {
    return state.projects;
  },
  sort: (state) => {
    return state.sort;
  },
  isModalOpen: (state) => {
    return state.isModalOpen;
  },
  isDeleteModal: (state) => {
    return state.isDeleteModal;
  },
  isEditMode: (state) => {
    return state.isEditMode;
  },
  projectForm: (state) => {
    return state.projectForm;
  },
  employees: (state) => {
    return state.employees;
  },
  projectToDelete: (state) => {
    return state.projectToDelete;
  },
};

//actions
const actions = {
  async getProjects({ state, commit }) {

    try {
      const { data } = await axios.post('http://localhost:8081/projects/projects', state.sort);
      commit('setProjects', data);
    } catch (e) {
      throw new Error(e);
    }
  },
  async getProjectDetail({ commit }, payload) {

    try {
      const { data } = await axios.post('http://localhost:8081/project/getDetail', payload);
      commit('setProjectForm', data);
      commit('setModal');
    } catch (e) {
      throw new Error(e);
    }
  },
  async getEmployees({ commit }) {
    try {
      const { data } = await axios.post('http://localhost:8081/employees/employeeList');
      commit('setEmployees', data);
    } catch (e) {
      throw new Error(e);
    }
  },
  async getEmployeesWithoutProject({ commit }, payload) {

    try {
      const { data } = await axios.post('http://localhost:8081/employees/employeeListWithoutProject', payload);
      commit('setEmployees', data);
    } catch (e) {
      throw new Error(e);
    }
  },
  async createNewProject({ commit, dispatch }, payload) {

    try {
      await axios.post('http://localhost:8081/project/create', payload);
      dispatch('getProjects');
      commit('resetForm');
      commit('setModal');
      dispatch('notify/openNotifySuccess', 'Project has been created', { root: true });
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },

  async updateProject({ state, commit, dispatch }) {
    try {
      await axios.post('http://localhost:8081/project/update', state.projectForm);
      dispatch('getProjects');
      commit('setModal');
      commit('resetForm');
      dispatch('notify/openNotifySuccess', 'Project has been updated', { root: true });
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },
  async deleteProject({ state, commit, dispatch }) {
    try {
      await axios.delete('http://localhost:8081/project/delete', { data: { uuid: state.projectToDelete.uuid } });
      dispatch('getProjects');
      commit('setDeleteModal');
      commit('resetProjectToDelete');
      dispatch('notify/openNotifySuccess', 'Project has been deleted', { root: true });
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },
};

//mutations
const mutations = {
  setProjects: (state, payload) => {
    state.projects = payload;
  },
  setSort: (state, payload) => {
    if (state.sort.sortBy === payload) {
      state.sort.direction = state.sort.direction === 'ASC' ? 'DESC' : 'ASC';
    } else {
      state.sort.sortBy = payload;
    }
  },
  setModal: (state) => {
    state.isModalOpen = !state.isModalOpen;
  },
  setEditMode: (state, payload) => {
    state.isEditMode = payload;
  },
  setDeleteModal: (state) => {
    state.isDeleteModal = !state.isDeleteModal;
  },
  setProjectForm: (state, payload) => {
    state.projectForm = payload;
  },
  setEmployees: (state, payload) => {
    state.employees = payload;
  },
  resetForm: (state) => {
    state.projectForm = {
      name: '',
      client: '',
      dateStart: '',
      dateEnd: '',
      topic: '',
      description: '',
      employees: [],
    };
  },
  setProjectToDelete: (state, payload) => {
    state.projectToDelete = payload;
  },
  resetProjectToDelete: (state) => {
    state.projectToDelete = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
