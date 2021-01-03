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

  const openPdfModal = () => {
    context.emit('open-pdf-modal');
  };

  return {
    openPdfModal,
    importProject,
    addNewEducation,
    addNewCertificate,
    changeEditProfileModal,
  };
};