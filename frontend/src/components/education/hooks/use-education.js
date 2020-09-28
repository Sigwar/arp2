import { ref } from '@vue/composition-api';

export const useEducation = (context) => {

  const isHover = ref(false);

  const removeEducation = (payload) => {
    const params = {
      uuid: payload.uuid,
      name: payload.schoolName,
      type: 'education',
    };

    context.emit('remove-education', params);
  };

  const editEducation = (uuid) => {
    context.emit('edit-education', uuid);
  };

  return {
    isHover,
    editEducation,
    removeEducation,
  };
};