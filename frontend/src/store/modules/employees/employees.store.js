import axios from 'axios';

const state = {
  employees: [],
  knowledgeTags: [],
  professionList: [ 'TRAINEE', 'JUNIOR', 'PROFESSIONAL', 'SENIOR' ],
  sort: {
    sortBy: 'NAME',
    direction: 'ASC',
  },
  isModalOpen: false,
  employeeForm: {
    name: '',
    lastName: '',
    level: '',
    profession: '',
    birthDay: '',
    itExperience: '',
    language: '',
    isActive: true,
    itKnowledge: [],
    projects: '',
    picture: {
      url: '',
      file: {},
    },
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
  knowledgeTags: (state) => {
    return state.knowledgeTags;
  },
  projects: (state) => {
    return state.projects;
  },
};

// actions
const actions = {
  async getTagsKnowledge({ commit }) {
    try {
      const { data } = await axios.get('http://localhost:3000/knowledgeTags');
      commit('setKnowledgeTags', data);
    } catch (e) {
      console.log('e: ', e);
    }
  },
  async getEmployees({ commit }) {
    try {
      const { data } = await axios.get('http://localhost:3000/employees');
      commit('setEmployees', data);
    } catch (e) {
      console.log('e: ', e);
    }
  },
  async createNewEmployee({ state, commit }) {
    try {
      await axios.post('', state.employeeForm);
      commit('setIsModalOpen', false);
      commit('resetEmployeeForm');
    } catch (e) {
      console.log('e: ', e);
    }
  },
  async getProjects({ commit }) {
    try {
      const { data } = await axios.get('http://localhost:3000/projectsList');
      commit('setProjects', data);
    } catch (e) {
      console.log('e: ', e);
    }
  },
};

// mutations
const mutations = {
  setEmployees: (state, payload) => {
    state.employees = payload;
  },
  setSort: (state, payload) => {
    if (state.sort.sortBy === payload) {
      state.sort.direction = state.sort.direction === 'ASC' ? 'DES' : 'ASC';
    } else {
      state.sort.sortBy = payload;
    }
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
      birthDay: '',
      itExperience: '',
      language: '',
      isActive: true,
      itKnowledge: [],
      picture: {
        src: '',
        file: {},
      },
    };
  },
  setKnowledgeTags: (state, payload) => {
    state.knowledgeTags = payload;
  },
  setProjects: (state, payload) => {
    state.projects = payload;
  },
  setEmployeePicture: (state, payload) => {
    state.employeeForm.picture = {
      url: URL.createObjectURL(payload),
      file: payload,
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};