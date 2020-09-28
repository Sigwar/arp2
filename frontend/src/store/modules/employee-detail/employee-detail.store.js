import axios from 'axios';

const state = {
  profile: {},
  profileModal: {},
  editProfileModal: false,

  educations: [],
  editEducationModal: {
    visibility: false,
    isNew: true,
    data: {
      educationDate: [ '', '' ],
      schoolName: '',
      description: '',
    },
  },
  editProjectModal: {
    visibility: false,
    data: {},
  },

  projects: [],
  projectsToImport: {
    visibility: false,
    projects: [],
  },

  deleteModalData: {
    visibility: false,
    data: {},
  },

  knowledgeTags: [],
  professionList: [],
};

// getters
const getters = {
  profile: (state) => {
    return state.profile;
  },
  educations: (state) => {
    return state.educations;
  },
  projects: (state) => {
    return state.projects;
  },

  deleteModalData: (state) => {
    return state.deleteModalData;
  },

  editEducation: (state) => {
    return state.editEducationModal;
  },
  editProfileModal: (state) => {
    return state.editProfileModal;
  },
  editProjectModal: (state) => {
    return state.editEducationModal;
  },

  knowledgeTags: (state) => {
    return state.knowledgeTags;
  },
  professionList: (state) => {
    return state.professionList;
  },
  projectToImports: (state) => {
    return state.projectsToImport;
  },
};

// actions
const actions = {
  async getEmployeeProfile({ commit }, payload) {
    try {
      console.log('payload: ', payload);
      const { data } = await axios.get('http://localhost:3000/employeeProfile');
      commit('setEmployeeProfile', { ...data });
      commit('setProfileModal', { ...data });
    } catch (e) {
      console.log('e: ', e);
    }
  },
  async getEmployeeEducation({ commit }, payload) {
    try {
      console.log('payload: ', payload);
      const { data } = await axios.get('http://localhost:3000/employeeEducation');
      commit('setEmployeeEducation', data);
    } catch (e) {
      console.log('e: ', e);
    }
  },
  async getEmployeeProjects({ commit }, payload) {
    try {
      console.log('payload: ', payload);
      const { data } = await axios.get('http://localhost:3000/employeeProjects');
      commit('setEmployeeProjects', data);
    } catch (e) {
      console.log('e: ', e);
    }
  },
  async getKnowledgeTags({ commit }) {
    try {
      const { data } = await axios.get('http://localhost:3000/knowledgeTags');
      commit('setKnowledgeTags', data);
    } catch (e) {
      console.log('e: ', e);
    }
  },

  async getProfessionList({ commit }) {
    try {
      const { data } = await axios.get('http://localhost:3000/professionList');
      commit('setProfessionList', data);
    } catch (e) {
      console.log('e: ', e);
    }
  },

  async getAllProjects({ commit }) {
    try {
      const { data } = await axios.get('http://localhost:3000/allProjects');
      commit('setProjectsToImport', data);
    } catch (e) {
      console.log('e: ', e);
    }
  },

  async updateProfile({ state, dispatch, commit }) {
    try {
      await axios.patch(`updateProfile/${state.profileModal.uuid}`, state.profileModal);
      dispatch('getEmployeeProfile', state.profileModal.uuid);
      commit('setEditProfileModal', false);
    } catch (e) {
      console.log('e: ', e);
    }
  },
  async updateEducation({ state, dispatch, commit }) {
    try {
      await axios.patch(`updateProfile/${state.editEducationModal.uuid}`, state.editEducationModal.data);
      dispatch('getEmployeeEducation');
      const params = {
        visibility: false,
        isNew: true,
        data: {
          educationDate: [ '', '' ],
          schoolName: '',
          description: '',
        },
      };
      commit('setEditEducationModal', params);
    } catch (e) {
      console.log('e: ', e);
    }
  },

  async createNewEducation({ state, commit, dispatch }) {
    try {
      await axios.post(`createNewEducation`, state.editEducationModal.data);
      dispatch('getEmployeeEducation');
      const params = {
        visibility: false,
        isNew: true,
        data: {
          educationDate: [ '', '' ],
          schoolName: '',
          description: '',
        },
      };
      commit('setEditEducationModal', params);
    } catch (e) {
      console.log('e: ', e);
    }
  },

  async importProjects({ commit, dispatch }, payload) {
    console.log('payload: ', payload);
    try {
      // await axios.post(`importProjects`, payload);
      commit('setProjectsToImportVisibility', false);
      dispatch('getEmployeeProjects')
    } catch (e) {
      console.log('e: ', e);
    }
  },

  async deleteEducation({ state, commit }) {
    try {
      await axios.delete('http://localhost:3000/employeeProjects', state.deleteModalData.data.uuid);
      const params = {
        visibility: false,
        data: {},
      };

      commit('setDeleteModalData', params);
    } catch (e) {
      const params = {
        visibility: false,
        data: {},
      };

      commit('setDeleteModalData', params);
    }
  },
};

// mutations
const mutations = {
  setEmployeeProfile: (state, payload) => {
    state.profile = payload;
  },
  setEmployeeEducation: (state, payload) => {
    state.educations = payload;
  },
  setEmployeeProjects: (state, payload) => {
    state.projects = payload;
  },
  setDeleteModalData: (state, payload) => {
    state.deleteModalData = payload;
  },
  setEditEducationModal: (state, payload) => {
    state.editEducationModal = payload;
  },
  setEditProjectModal: (state, payload) => {
    state.editProjectModal = payload;
  },
  setKnowledgeTags: (state, payload) => {
    state.knowledgeTags = payload;
  },
  setEditProfileModal: (state, payload) => {
    state.editProfileModal = payload;
  },
  setProfileModal: (state, payload) => {
    state.profileModal = payload;
  },
  setProfessionList: (state, payload) => {
    state.professionList = payload;
  },
  setEmployeePicture: (state, payload) => {
    state.profileModal.picture = {
      url: URL.createObjectURL(payload),
      file: payload,
    };
  },
  setProjectsToImport: (state, payload) => {
    state.projectsToImport.projects = payload;
  },
  setProjectsToImportVisibility: (state, payload) => {
    state.projectsToImport.visibility = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};