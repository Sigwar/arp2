import { reactive } from '@vue/composition-api';
import store        from '@/store/store';
import router       from '@/router';

export const useLoginForm = () => {
  const loginForm = reactive({
    login: '',
    password: '',
  });

  const signIn = () => {
    store.dispatch('signIn', loginForm);
  };

  const goToRegisterPage = () => {
    router.push({ name: 'Registration' }).catch(() => {
    });
  };

  return {
    signIn,
    loginForm,
    goToRegisterPage,
  };
};