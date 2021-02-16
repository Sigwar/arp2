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
      date: [ '', '' ],
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

  certificates: [],
  editCertificatesModal: {
    visibility: false,
    isNew: true,
    data: {
      name: '',
      date: '',
      credentialId: '',
    },
  },

  deleteModalData: {
    visibility: false,
    data: {},
  },

  pdfModal: false,
  pdfModalLoading: false,
  pdfSettings: {
    blind: false,
    showEducation: true,
    shoeEducationDescription: true,
    showCertificate: true,
    showDescriptionProject: true,
    showTopicProject: true,
  },
};

// getters
const getters = {
  profile: (state) => {
    return state.profile;
  },
  pdfSettings: (state) => {
    return state.pdfSettings;
  },
  pdfModalLoading: (state) => {
    return state.pdfModalLoading;
  },
  pdfModal: (state) => {
    return state.pdfModal;
  },
  educations: (state) => {
    return state.educations;
  },
  projects: (state) => {
    return state.projects;
  },
  certificates: (state) => {
    return state.certificates;
  },
  editCertificatesModal: (state) => {
    return state.editCertificatesModal;
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
  projectToImports: (state) => {
    return state.projectsToImport;
  },
};

// actions

const actions = {
  async getEmployeeProfile({ commit }, payload) {
    try {
      const { data } = await axios.post('http://localhost:8081/employee/detail', payload);
      commit('setEmployeeProfile', { ...data });
      commit('setProfileModal', { ...data });
    } catch (e) {
      throw new Error(e);
    }
  },

  async getEmployeeEducation({ commit }, payload) {
    try {
      const { data } = await axios.post('http://localhost:8081/employee/educations', { employeeUuid: payload });
      commit('setEmployeeEducation', data);
    } catch (e) {
      throw new Error(e);
    }
  },

  async getEmployeeProjects({ commit }, payload) {
    try {
      const { data } = await axios.post('http://localhost:8081/employee/projects', { employeeUuid: payload });
      commit('setEmployeeProjects', data);
    } catch (e) {
      throw new Error(e);
    }
  },

  async getEmployeeCertificate({ commit }, payload) {
    try {
      const { data } = await axios.post('http://localhost:8081/employee/certificate', { employeeUuid: payload });
      commit('setCertificate', data);
    } catch (e) {
      throw new Error(e);
    }
  },

  async getAllProjectsToImport({ commit }, payload) {
    try {
      const { data } = await axios.post('http://localhost:8081/employee/projects-to-import', { employeeUuid: payload });
      commit('setProjectsToImport', data);
    } catch (e) {
      throw new Error(e);
    }
  },

  async updateProfile({ state, dispatch, commit }) {
    try {
      await axios.patch('http://localhost:8081/employee/update', { employee: state.profileModal });
      dispatch('getEmployeeProfile', { employeeUuid: state.profileModal.uuid });
      commit('setEditProfileModal', false);
      dispatch('notify/openNotifySuccess', 'Profile has been updated', { root: true });
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },

  async updateProject({ state, dispatch, commit }) {
    try {
      await axios.patch('http://localhost:8081/employee/update-project', state.editProjectModal.data);
      dispatch('getEmployeeProjects', state.profileModal.uuid);
      dispatch('notify/openNotifySuccess', 'The project list has been updated', { root: true });
      const params = {
        visibility: false,
        data: {},
      };
      commit('setEditProjectModal', params);
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },

  async updateCertificate({ state, dispatch, commit }, payload) {
    try {
      await axios.patch('http://localhost:8081/employee/update-certificate', state.editCertificatesModal.data);
      const params = {
        visibility: false,
        isNew: true,
        data: {},
      };
      commit('setEditCertificateModal', params);
      dispatch('getEmployeeCertificate', payload);
      dispatch('notify/openNotifySuccess', 'Certificate has been updated', { root: true });
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },

  async updateEducation({ state, dispatch, commit }, payload) {
    try {
      await axios.patch(`http://localhost:8081/employee/update-education`, state.editEducationModal.data);
      const params = {
        visibility: false,
        isNew: true,
        data: {
          date: [ '', '' ],
          schoolName: '',
          description: '',
        },
      };
      commit('setEditEducationModal', params);
      dispatch('getEmployeeEducation', payload);
      dispatch('notify/openNotifySuccess', 'Education has been updated', { root: true });
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },

  async createNewEducation({ state, commit, dispatch }, payload) {
    try {
      const data = {
        employeeUuid: payload,
        ...state.editEducationModal.data,
      };
      await axios.post(`http://localhost:8081/employee/create-education`, data);
      dispatch('getEmployeeEducation', payload);
      const params = {
        visibility: false,
        isNew: true,
        data: {
          date: [ '', '' ],
          schoolName: '',
          description: '',
        },
      };
      commit('setEditEducationModal', params);
      dispatch('notify/openNotifySuccess', 'Education has been created', { root: true });
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },

  async createNewCertificate({ state, commit, dispatch }, payload) {
    try {
      const data = {
        employeeUuid: payload,
        ...state.editCertificatesModal.data,
      };
      await axios.post(`http://localhost:8081/employee/create-certificate`, data);
      const params = {
        visibility: false,
        isNew: true,
        data: {
          name: '',
          date: '',
          credentialId: '',
        },
      };
      commit('setEditCertificateModal', params);
      dispatch('getEmployeeCertificate', payload);
      dispatch('notify/openNotifySuccess', 'Certificate has been created', { root: true });
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },

  async importProjects({ commit, dispatch }, payload) {
    try {
      await axios.post('http://localhost:8081/employee/import-project', payload);
      commit('setProjectsToImportVisibility', false);
      dispatch('getEmployeeProjects', payload.employeeUuid);
      dispatch('getAllProjectsToImport', payload.employeeUuid);
      dispatch('notify/openNotifySuccess', 'Projects have been imported', { root: true });
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },

  async deleteItem({ state, commit, dispatch }, payload) {
    try {
      if (state.deleteModalData.data.type === 'project') {
        await axios.delete('http://localhost:8081/employee/delete-project', { data: { uuid: state.deleteModalData.data.uuid } });
        dispatch('getEmployeeProjects', payload);
        dispatch('getAllProjectsToImport', payload);
        dispatch('notify/openNotifySuccess', 'Project has been deleted', { root: true });
      } else if (state.deleteModalData.data.type === 'education') {
        await axios.delete('http://localhost:8081/employee/delete-education', { data: { uuid: state.deleteModalData.data.uuid } });
        dispatch('getEmployeeEducation', payload);
        dispatch('notify/openNotifySuccess', 'Education has been deleted', { root: true });
      } else if (state.deleteModalData.data.type === 'certificate') {
        await axios.delete('http://localhost:8081/employee/delete-certificate', { data: { uuid: state.deleteModalData.data.uuid } });
        dispatch('getEmployeeCertificate', payload);
        dispatch('notify/openNotifySuccess', 'Certificate has been delete', { root: true });
      }
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
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },
};

// mutations
const mutations = {
  setPdfModal: (state, payload) => {
    state.pdfModal = payload;
  },
  setPdfSettings: (state, payload) => {
    state.pdfSettings = payload;
  },
  setPdfModalLoading: (state, payload) => {
    state.pdfModalLoading = payload;
  },
  setEmployeeProfile: (state, payload) => {
    state.profile = {
      ...payload,
      isActive: payload.isActive === 1,
    };
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
    state.editProjectModal = {
      visibility: payload.visibility,
      data: {
        ...payload.data,
        date: [ payload.data.dateStart, payload.data.dateEnd ],
      },
    };
  },
  setEditProfileModal: (state, payload) => {
    state.editProfileModal = payload;
  },
  setProfileModal: (state, payload) => {
    state.profileModal = {
      ...payload,
      isActive: payload.isActive === 1,
    };
  },
  setRolesInProject: (state, payload) => {
    if (state.editProjectModal.data.roles) {
      const isRoleInArray = state.editProjectModal.data.roles.find(el => el === payload);

      if (!isRoleInArray) {
        state.editProjectModal.data.roles.push(payload);
      }
    }
  },
  removeRoleInProject: (state, payload) => {
    state.editProjectModal.data.roles.splice(state.editProjectModal.data.roles.indexOf(payload), 1);
  },
  setActivitiesInProject: (state, payload) => {
    if (state.editProjectModal.data.activities) {
      const isActivitiesInArray = state.editProjectModal.data.activities.find(el => el === payload);

      if (!isActivitiesInArray) {
        state.editProjectModal.data.activities.push(payload);
      }
    }
  },
  removeActivitiesInProject: (state, payload) => {
    state.editProjectModal.data.activities.splice(state.editProjectModal.data.activities.indexOf(payload), 1);
  },
  setEmployeePicture: (state, payload) => {
    let fd = new FormData();
    fd.append('image', payload[ 0 ]);
    const blobFile = new Blob([ payload.target.files[ 0 ] ], { type: payload.target.files [ 0 ].type });


    state.profileModal.picture = {
      url: URL.createObjectURL(blobFile),
      image: fd,
    };
  },
  setProjectsToImport: (state, payload) => {
    state.projectsToImport.projects = payload;
  },
  setProjectsToImportVisibility: (state, payload) => {
    state.projectsToImport.visibility = payload;
  },
  setCertificate: (state, payload) => {
    state.certificates = payload;
  },
  setEditCertificateModal: (state, payload) => {
    state.editCertificatesModal = {
      visibility: payload.visibility,
      isNew: payload.isNew,
      data: {
        ...payload.data,
      },
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