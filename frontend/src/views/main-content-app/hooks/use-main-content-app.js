import { onMounted, ref } from '@vue/composition-api';
import router             from '@/router';

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
    router.push({ name: 'Login' }).catch(() => {
    });
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
