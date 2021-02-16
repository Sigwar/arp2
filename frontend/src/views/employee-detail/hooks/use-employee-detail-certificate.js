import { computed } from '@vue/composition-api';
import store        from '@/store/store';

export const useEmployeeDetailCertificate = () => {

  const getCertificate = (uuid) => {
    store.dispatch('employeeDetailModule/getEmployeeCertificate', uuid);
  };

  const deleteItem = (uuid) => {
    store.dispatch('employeeDetailModule/deleteItem', uuid);
  };

  const updateCertificate = (form, uuid) => {
    form.validate((valid) => {
      if (valid) {
        store.dispatch('employeeDetailModule/updateCertificate', uuid);
      }
    });
  };

  const closeEditCertificateModal = () => {
    const params = {
      visibility: false,
      isNew: true,
      data: {},
    };

    store.commit('employeeDetailModule/setEditCertificateModal', params);
  };

  const openEditModal = (certificate) => {
    const params = {
      visibility: true,
      isNew: false,
      data: {
        ...certificate,
      },
    };

    store.commit('employeeDetailModule/setEditCertificateModal', params);
  };

  const openNewCertificateModal = () => {
    const params = {
      visibility: true,
      isNew: true,
      data: {
        name: '',
        date: '',
        credentialId: '',
      },
    };

    store.commit('employeeDetailModule/setEditCertificateModal', params);
  };

  const createCertificate = (form, uuid) => {
    form.validate((valid) => {
      if (valid) {
        store.dispatch('employeeDetailModule/createNewCertificate', uuid);
      }
    });
  };

  const certificates = computed(() => store.state.employeeDetailModule.certificates);

  const editCertificatesModal = computed(() => store.state.employeeDetailModule.editCertificatesModal);

  return {
    deleteItem,
    certificates,
    openEditModal,
    getCertificate,
    createCertificate,
    updateCertificate,
    editCertificatesModal,
    openNewCertificateModal,
    closeEditCertificateModal,
  };
};