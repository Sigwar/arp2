import Vue    from 'vue';
import Vuex   from 'vuex';
import axios  from 'axios';
import notify from './notify.store';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    notify,
  },
  state: {
    global: {
      user: {},
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
    setUser: (state, payload) => {
      state.global.user = payload;
    },
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
    logout(state) {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      state.global.user = {};
    },
    restAllGlobals(state) {
      state.global.user = {},
        state.global.languages = [],
        state.global.levelList = [],
        state.global.professions = [],
        state.global.itTechnologies = [],
        state.global.levelDetailList = [],
        state.global.workstationDetail = [],
        state.global.languagesWithoutLevel = [];
    },
  },
  actions: {
    async signIn({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.post('http://localhost:8081/auth/signIn', {
          login: payload.login,
          password: payload.password,
        });

        sessionStorage.setItem('token', JSON.stringify(data.token));
        sessionStorage.setItem('user', JSON.stringify(data.login));

        commit('setUser', data);
        router.push({ name: 'Home' }).catch(() => {
        });
        dispatch('notify/openNotifySuccess', 'You have been logged in', { root: true });
      } catch (e) {
        dispatch('notify/openNotifyError', 'Wrong login or password', { root: true });
        throw new Error(e);
      }
    },

    async getLevelList({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/levels/levels');
        commit('setLevelList', data);
      } catch (e) {
        throw new Error(e);
      }
    },

    async getLevelDetailList({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/levels/levelsDetail');
        commit('setLevelDetailList', data);
      } catch (e) {
        throw new Error(e);
      }
    },

    async getLanguages({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/languages/languages');
        commit('setLanguages', data);
      } catch (e) {
        throw new Error(e);
      }
    },

    async getItTechnologies({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/itTechnologies/technologies');
        commit('setItTechnologies', data);
      } catch (e) {
        throw new Error(e);
      }
    },

    async getWorkstations({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/workstations/workstations');
        commit('setProfessions', data);
      } catch (e) {
        throw new Error(e);
      }
    },

    async getWorkstationDetail({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/workstations/workstations-detail');
        commit('setWorkstationDetail', data);
      } catch (e) {
        throw new Error(e);
      }
    },

    async getLanguagesWithoutLevel({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:8081/languages/languages-without-level');
        commit('setLanguageWithoutLevel', data);
      } catch (e) {
        throw new Error(e);
      }
    },

    async createNewItTechnologies({ dispatch }, payload) {
      try {
        await axios.post('http://localhost:8081/itTechnologies/create', { name: payload });
        dispatch('notify/openNotifySuccess', 'New It technologies have been updated', { root: true });
        dispatch('getItTechnologies');
      } catch (e) {
        dispatch('notify/openNotifyError', e.response, { root: true });
      }
    },

    async deleteItTechnologies({ dispatch }, payload) {
      try {
        await axios.delete('http://localhost:8081/itTechnologies/delete', { data: { name: payload } });
        dispatch('getItTechnologies');
        dispatch('notify/openNotifySuccess', 'It technologies have been deleted', { root: true });
      } catch (e) {
        dispatch('notify/openNotifyError', e.response, { root: true });
      }
    },

    async createNewLanguages({ dispatch }, payload) {
      try {
        await axios.post('http://localhost:8081/languages/create', { name: payload });
        dispatch('getLanguagesWithoutLevel');
        dispatch('notify/openNotifySuccess', 'New language has been created', { root: true });
      } catch (e) {
        dispatch('notify/openNotifyError', e.response, { root: true });
      }
    },

    async deleteLanguages({ dispatch }, payload) {
      try {
        await axios.delete('http://localhost:8081/languages/delete', { data: { uuid: payload } });
        dispatch('getLanguagesWithoutLevel');
        dispatch('notify/openNotifySuccess', 'Language has been deleted', { root: true });
      } catch (e) {
        dispatch('notify/openNotifyError', e.response, { root: true });
      }
    },

    async createNewLevel({ dispatch }, payload) {
      try {
        await axios.post('http://localhost:8081/levels/create', { name: payload });
        dispatch('getLevelDetailList');
        dispatch('notify/openNotifySuccess', 'New level has been created', { root: true });
      } catch (e) {
        dispatch('notify/openNotifyError', e.response, { root: true });
      }
    },

    async deleteLevel({ dispatch }, payload) {
      try {
        await axios.delete('http://localhost:8081/levels/delete', { data: { uuid: payload } });
        dispatch('getLevelDetailList');
        dispatch('notify/openNotifySuccess', 'New level has been deleted', { root: true });
      } catch (e) {
        dispatch('notify/openNotifyError', e.response, { root: true });
      }
    },

    async createNewWorkstation({ dispatch }, payload) {
      try {
        await axios.post('http://localhost:8081/workstations/create', { name: payload });
        dispatch('getWorkstationDetail');
        dispatch('notify/openNotifySuccess', 'New workstation has been created', { root: true });
      } catch (e) {
        dispatch('notify/openNotifyError', e.response, { root: true });
      }
    },

    async deleteWorkstation({ dispatch }, payload) {
      try {
        await axios.delete('http://localhost:8081/workstations/delete', { data: { uuid: payload } });
        dispatch('getWorkstationDetail');
        dispatch('notify/openNotifySuccess', 'New workstation has been deleted', { root: true });
      } catch (e) {
        dispatch('notify/openNotifyError', e.response, { root: true });
      }
    },
  },
  getters: {
    user: (state) => {
      return state.global.user;
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
    token: () => {
      return JSON.parse(sessionStorage.getItem('token')) ? JSON.parse(sessionStorage.getItem('token')) : '';
    },
  },
});
