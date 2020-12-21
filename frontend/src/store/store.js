import Vue                  from 'vue';
import Vuex                 from 'vuex';
import axios                from 'axios';
import employeesModule      from './modules/employees/employees.store.js';
import projectsModule       from './modules/projects/projects.store.js';
import employeeDetailModule from './modules/employee-detail/employee-detail.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    global: {
      user: {
        uuid: 'c2c7c31e-6083-419a-83cc-844e8f70ee90',
        login: 'admin',
      },
      languages: [],
      levelList: [],
      professions: [],
      itTechnologies: [],
      levelDetailList: [],
      workstationDetail: [],
      languagesWithoutLevel: [],
    },
  },
  mutations: {
    setLevelList: (state, payload) => {
      state.global.levelList = payload;
    },
    setItTechnologies: (state, payload) => {
      state.global.itTechnologies = payload;
    },
    setProfessions: (state, payload) => {
      state.global.professions = payload;
    },
    setLanguages: (state, payload) => {
      state.global.languages = payload;
    },
    setLanguageWithoutLevel: (state, payload) => {
      state.global.languagesWithoutLevel = payload;
    },
    setLevelDetailList: (state, payload) => {
      state.global.levelDetailList = payload;
    },
    setWorkstationDetail: (state, payload) => {
      state.global.workstationDetail = payload;
    },
  },
  actions: {
    async getLevelList({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/levels/levels');
        commit('setLevelList', data);
      } catch (e) {
        console.error(e);
      }
    },

    async getLevelDetailList({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/levels/levelsDetail');
        commit('setLevelDetailList', data);
      } catch (e) {
        console.error(e);
      }
    },

    async getLanguages({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/languages/languages');
        commit('setLanguages', data);
      } catch (e) {
        console.error(e);
      }
    },

    async getItTechnologies({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/itTechnologies/technologies');
        commit('setItTechnologies', data);
      } catch (e) {
        console.error(e);
      }
    },

    async getWorkstations({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/workstations/workstations');
        commit('setProfessions', data);
      } catch (e) {
        console.error(e);
      }
    },

    async getWorkstationDetail({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/workstations/workstations-detail');
        commit('setWorkstationDetail', data);
      } catch (e) {
        console.error(e);
      }
    },

    async getLanguagesWithoutLevel({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/languages/languages-without-level');
        commit('setLanguageWithoutLevel', data);
      } catch (e) {
        console.error(e);
      }
    },

    async createNewItTechnologies({ dispatch }, payload) {
      try {
        await axios.post('http://localhost:8081/itTechnologies/create', { name: payload });
        dispatch('getItTechnologies');
      } catch (e) {
        console.error(e);
      }
    },

    async deleteItTechnologies({ dispatch }, payload) {
      try {
        await axios.delete('http://localhost:8081/itTechnologies/delete', { data: { name: payload } });
        dispatch('getItTechnologies');
      } catch (e) {
        console.error(e);
      }
    },

    async createNewLanguages({ dispatch }, payload) {
      try {
        await axios.post('http://localhost:8081/languages/create', { name: payload });
        dispatch('getLanguagesWithoutLevel');
      } catch (e) {
        console.error(e);
      }
    },

    async deleteLanguages({ dispatch }, payload) {
      try {
        await axios.delete('http://localhost:8081/languages/delete', { data: { uuid: payload } });
        dispatch('getLanguagesWithoutLevel');
      } catch (e) {
        console.error(e);
      }
    },

    async createNewLevel({ dispatch }, payload) {
      try {
        await axios.post('http://localhost:8081/levels/create', { name: payload });
        dispatch('getLevelDetailList');
      } catch (e) {
        console.error(e);
      }
    },

    async deleteLevel({ dispatch }, payload) {
      try {
        await axios.delete('http://localhost:8081/levels/delete', { data: { uuid: payload } });
        dispatch('getLevelDetailList');
      } catch (e) {
        console.error(e);
      }
    },

    async createNewWorkstation({ dispatch }, payload) {
      try {
        await axios.post('http://localhost:8081/workstations/create', { name: payload });
        dispatch('getWorkstationDetail');
      } catch (e) {
        console.error(e);
      }
    },

    async deleteWorkstation({ dispatch }, payload) {
      try {
        await axios.delete('http://localhost:8081/workstations/delete', { data: { uuid: payload } });
        dispatch('getWorkstationDetail');
      } catch (e) {
        console.error(e);
      }
    },
  },
  modules: {
    projectsModule,
    employeesModule,
    employeeDetailModule,
  },
  getters: {
    user: (state) => {
      return state.global.user;
    },
    userUuid: (state) => {
      return state.global.user.uuid;
    },
    levelList: (state) => {
      return state.global.levelList;
    },
    itTechnologies: (state) => {
      return state.global.itTechnologies;
    },
    languages: (state) => {
      return state.global.languages;
    },
    languagesWithoutLevel: (state) => {
      return state.global.languagesWithoutLevel;
    },
    LevelDetailList: (state) => {
      return state.global.levelDetailList;
    },
    workstationDetail: (state) => {
      return state.global.workstationDetail;
    },
  },
});
