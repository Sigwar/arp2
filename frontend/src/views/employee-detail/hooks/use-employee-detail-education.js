import { computed } from '@vue/composition-api';
import store             from '@/store/store';

export const useEmployeeDetailEducation = () => {
  const deleteEducation = () => {
    store.dispatch('employeeDetailModule/deleteEducation');
  };

  const updateEducation = () => {
    store.dispatch('employeeDetailModule/updateEducation');
  };

  const closeEditEducationModal = () => {
    const params = {
      visibility: false,
      isNew: true,
      data: {
        educationDate: [ '', '' ],
        schoolName: '',
        description: '',
      },
    };

    store.commit('employeeDetailModule/setEditEducationModal', params);
  };

  const openEditModal = (education) => {
    const params = {
      visibility: true,
      isNew: false,
      data: { ...education },
    };

    store.commit('employeeDetailModule/setEditEducationModal', params);
  };

  const openNewEducationModal = () => {
    const params = {
      visibility: true,
      isNew: true,
      data: {
        educationDate: [ '', '' ],
        schoolName: '',
        description: '',
      },
    };

    store.commit('employeeDetailModule/setEditEducationModal', params);
  };

  const createEducation = () => {
    store.dispatch('employeeDetailModule/createNewEducation');
  };

  const educations = computed(() => store.state.employeeDetailModule.educations);

  const editEducationModal = computed(() => store.state.employeeDetailModule.editEducationModal);

  return {
    educations,
    openEditModal,
    createEducation,
    updateEducation,
    deleteEducation,
    editEducationModal,
    openNewEducationModal,
    closeEditEducationModal
  }
};