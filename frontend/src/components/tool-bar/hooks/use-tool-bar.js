export const useToolbar = (context) => {

  const changeEditProfileModal = () => {
    context.emit('change-edit-profile-modal', true);
  };

  const addNewEducation = () => {
    context.emit('add-new-education');
  };

  const importProject = () => {
    context.emit('import-project');
  };

  return {
    importProject,
    addNewEducation,
    changeEditProfileModal,
  };
};