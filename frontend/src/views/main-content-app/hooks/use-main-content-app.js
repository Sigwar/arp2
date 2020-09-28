import { onMounted, ref } from '@vue/composition-api';
import router             from '@/router';

export const useMainContentApp = () => {

  const activeLink = ref('');

  const setActiveLink = (nameClass) => {
    activeLink.value = nameClass;
    if (nameClass === 'active-employees') {
      router.push({ name: 'Employees list' }).catch(() => {});
    } else {
      router.push({ name: 'Projects list' }).catch(() => {});
    }
  };

  const logOut = () => {
    router.push({ name: 'Login' }).catch(() => {});
  };

  onMounted(() => {
    activeLink.value = router.currentRoute.fullPath.includes('employee') ? 'active-employees' : 'active-projects';
  });

  return {
    logOut,
    activeLink,
    setActiveLink,
  };
};
