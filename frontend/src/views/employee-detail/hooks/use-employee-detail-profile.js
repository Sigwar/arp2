import { computed } from '@vue/composition-api';
import store        from '@/store/store';

export const useEmployeeDetailProfile = () => {

  //PROFILE
  const openEditProfileModal = () => {
    store.commit('employeeDetailModule/setEditProfileModal', true);
  };

  const closeEditProfileModal = () => {
    store.commit('employeeDetailModule/setEditProfileModal', false);
  };

  const updateProfile = () => {
    store.dispatch('employeeDetailModule/updateProfile');
  };

  const profile = computed(() => store.state.employeeDetailModule.profile);
  const profileModal = computed(() => store.state.employeeDetailModule.profileModal);
  const professionList = computed(() => store.state.employeeDetailModule.professionList);
  const editProfileModal = computed(() => store.state.employeeDetailModule.editProfileModal);

  return {
    profile,
    profileModal,
    updateProfile,
    professionList,
    editProfileModal,
    openEditProfileModal,
    closeEditProfileModal,
  };
};