import { ref } from '@vue/composition-api';

export const useProject = (context) => {

  const isHover = ref(false);

  const removeProject = (projectDetail) => {

    const params = {
      uuid: projectDetail.uuid,
      name: projectDetail.name,
      client: projectDetail.client,
      type: 'project',
    };

    context.emit('remove-project', params);
  };

  const editProject = (projectDetail) => {
    context.emit('edit-project', projectDetail);
  };

  return {
    isHover,
    editProject,
    removeProject,
  };
};