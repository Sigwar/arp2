import { computed } from '@vue/composition-api';
import store        from '@/store/store';

export const useEmployeeDetailEducation = () => {

  const getEducation = (uuid) => {
    store.dispatch('employeeDetailModule/getEmployeeEducation', uuid);
  };

  const deleteItem = (uuid) => {
    store.dispatch('employeeDetailModule/deleteItem', uuid);
  };

  const updateEducation = (uuid) => {
    store.dispatch('employeeDetailModule/updateEducation', uuid);
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
      data: {
        ...education,
      },
    };

    store.commit('employeeDetailModule/setEditEducationModal', params);
  };

  const openNewEducationModal = () => {
    const params = {
      visibility: true,
      isNew: true,
      data: {
        date: [ '', '' ],
        schoolName: '',
        description: '',
      },
    };

    store.commit('employeeDetailModule/setEditEducationModal', params);
  };

  const createEducation = (uuid) => {
    store.dispatch('employeeDetailModule/createNewEducation', uuid);
  };

  const educations = computed(() => store.state.employeeDetailModule.educations);

  const editEducationModal = computed(() => store.state.employeeDetailModule.editEducationModal);

  return {
    educations,
    deleteItem,
    getEducation,
    openEditModal,
    createEducation,
    updateEducation,
    editEducationModal,
    openNewEducationModal,
    closeEditEducationModal,
  };
};