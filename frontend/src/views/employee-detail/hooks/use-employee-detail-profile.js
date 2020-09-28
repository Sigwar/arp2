import { computed } from '@vue/composition-api';
import store             from '@/store/store';

export const useEmployeeDetailProfile = () => {

  //PROFILE
  const handleAvatarSuccess = (file) => {
    const blobFile = new Blob([ file.target.files[ 0 ] ], { type: file.target.files [ 0 ].type });
    store.commit('employeeDetailModule/setEmployeePicture', blobFile);
  };

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
  const knowledgeTags = computed(() => store.state.employeeDetailModule.knowledgeTags);
  const professionList = computed(() => store.state.employeeDetailModule.professionList);
  const editProfileModal = computed(() => store.state.employeeDetailModule.editProfileModal);

  return {

    profile,
    profileModal,
    knowledgeTags,
    updateProfile,
    professionList,
    editProfileModal,
    handleAvatarSuccess,
    openEditProfileModal,
    closeEditProfileModal,
  }
};