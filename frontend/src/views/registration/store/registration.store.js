import axios  from 'axios';
import router from '@/router';

const state = {
  registrationForm: {
    name: '',
    login: '',
    email: '',
    password: '',
    repeatPassword: '',
    rules: false,
  },
};

//getters
const getters = {
  registrationForm: (state) => {
    return state.registrationForm;
  },
};

//actions
const actions = {
  async registrationAccount({ dispatch }, payload) {
    try {
      await axios.post('http://localhost:8081/registration/create', payload);
      dispatch('notify/openNotifySuccess', 'Account has been created', { root: true });
      router.push({ name: 'Login' }).catch(() => {
      });
    } catch (e) {
      dispatch('notify/openNotifyError', e.response, { root: true });
    }
  },
};

//mutations
const mutations = {
  setRegistrationForm: (state, payload) => {
    state.registrationForm = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
