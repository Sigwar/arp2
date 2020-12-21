import { ref } from '@vue/composition-api';

export const useCertificate = (context) => {

  const isHover = ref(false);

  const removeCertificate = (payload) => {
    const params = {
      uuid: payload.uuid,
      name: payload.name,
      type: 'certificate',
    };

    context.emit('remove-certificate', params);
  };

  const editCertificate = (uuid) => {
    context.emit('edit-certificate', uuid);
  };

  return {
    isHover,
    editCertificate,
    removeCertificate,
  };
};