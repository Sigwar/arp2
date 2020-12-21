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

  const addNewCertificate = () => {
    context.emit('add-new-certificate');
  };
  return {
    importProject,
    addNewEducation,
    addNewCertificate,
    changeEditProfileModal,
  };
};