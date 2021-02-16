import router             from '@/router';
import store              from '../../../store/store';
import { onMounted, ref } from '@vue/composition-api';

export const useMainContentApp = () => {

  const activeLink = ref('');

  const setActiveLink = (nameClass) => {
    activeLink.value = nameClass;
    if (nameClass === 'active-employees') {
      router.push({ name: 'Employees list' }).catch(() => {
      });
    } else if (nameClass === 'active-projects') {
      router.push({ name: 'Projects list' }).catch(() => {
      });
    } else if (nameClass === 'active-settings') {
      router.push({ name: 'Settings' }).catch(() => {
      });
    }
  };

  const logOut = () => {
    store.commit('logout');
    store.commit('restAllGlobals');
    router.push({ name: 'Login' }).catch(() => {
    });
    store.dispatch('notify/openNotifySuccess', 'You have been logged out', { root: true });
  };

  onMounted(() => {
    if (router.currentRoute.fullPath.includes('employee')) {
      activeLink.value = 'active-employees';
    } else if (router.currentRoute.fullPath.includes('projects')) {
      activeLink.value = 'active-projects';

    } else if (router.currentRoute.fullPath.includes('settings')) {
      activeLink.value = 'active-settings';
    }
  });

  return {
    logOut,
    activeLink,
    setActiveLink,
  };
};
