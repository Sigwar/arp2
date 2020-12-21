import { computed, ref } from '@vue/composition-api';
import store             from '@/store/store';

export const useEmployeeDetail = () => {

  const showDeleteModal = ref(true);

  const getEmployeesProfile = (employeeUuid) => {
    const user = store.getters[ 'user' ];

    store.dispatch('employeeDetailModule/getEmployeeProfile', { userUuid: user.uuid, employeeUuid: employeeUuid });
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

  const getAllProjectsToImport = (payload) => {
    store.dispatch('employeeDetailModule/getAllProjectsToImport', payload);
  };

  const deleteModalData = computed(() => store.state.employeeDetailModule.deleteModalData);

  return {
    openDeleteModal,
    deleteModalData,
    showDeleteModal,
    closeDeleteModal,
    getEmployeesProfile,
    getAllProjectsToImport,
  };
};