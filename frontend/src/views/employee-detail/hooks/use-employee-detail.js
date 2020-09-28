import { computed, ref } from '@vue/composition-api';
import store             from '@/store/store';

export const useEmployeeDetail = () => {

  const showDeleteModal = ref(true);

  const getEmployeesProfile = () => {
    store.dispatch('employeeDetailModule/getEmployeeProfile');
    store.dispatch('employeeDetailModule/getEmployeeEducation');
    store.dispatch('employeeDetailModule/getEmployeeProjects');
    store.dispatch('employeeDetailModule/getKnowledgeTags');
    store.dispatch('employeeDetailModule/getProfessionList');
    store.dispatch('employeeDetailModule/getAllProjects');
  };

  //DELETE MODAL
  const closeDeleteModal = () => {
    const params = {
      visibility: false,
      data: {},
    };

    store.commit('employeeDetailModule/setDeleteModalData', params);
  };

  const openDeleteModal = (payload) => {
    const params = {
      visibility: true,
      data: payload,
    };

    store.commit('employeeDetailModule/setDeleteModalData', params);
  };

  const deleteModalData = computed(() => store.state.employeeDetailModule.deleteModalData);

  return {
    openDeleteModal,
    deleteModalData,
    showDeleteModal,
    closeDeleteModal,
    getEmployeesProfile,
  };
};