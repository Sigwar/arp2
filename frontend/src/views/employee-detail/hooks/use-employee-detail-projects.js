import { computed, ref } from '@vue/composition-api';
import store             from '@/store/store';

export const useEmployeeDetailProjects = () => {

  const selectedProjectsToImport = ref([]);

  let newRole = ref('');

  let newActivities = ref('');

  const getEmployeeProjects = (employeeUuid) => {
    store.dispatch('employeeDetailModule/getEmployeeProjects', employeeUuid);
  };

  const openEditProjectModal = (project) => {
    const params = {
      visibility: true,
      data: { ...project },
    };

    store.commit('employeeDetailModule/setEditProjectModal', params);
  };

  const closeEditProjectModal = () => {
    const params = {
      visibility: false,
      data: {},
    };

    store.commit('employeeDetailModule/setEditProjectModal', params);
  };

  const updateProject = () => {
    store.dispatch('employeeDetailModule/updateProject');
  };

  const openImportModal = () => {
    store.commit('employeeDetailModule/setProjectsToImportVisibility', true);
  };

  const closeImportModal = () => {
    selectedProjectsToImport.value = [];
    store.commit('employeeDetailModule/setProjectsToImportVisibility', false);
  };

  const importProjects = (employeeUuid) => {
    const data = {
      employeeUuid: employeeUuid,
      projects: selectedProjectsToImport.value,
    };

    store.dispatch('employeeDetailModule/importProjects', data);
    selectedProjectsToImport.value = [];
  };

  const addNewRoles = () => {
    store.commit('employeeDetailModule/setRolesInProject', newRole.value);
    newRole.value = '';
  };

  const removeRole = (role) => {
    store.commit('employeeDetailModule/removeRoleInProject', role);
  };

  const addNewActivities = () => {
    store.commit('employeeDetailModule/setActivitiesInProject', newActivities.value);
    newActivities.value = '';
  };

  const removeActivities = (activities) => {
    store.commit('employeeDetailModule/removeActivitiesInProject', activities);
  };

  const projects = computed(() => store.state.employeeDetailModule.projects);
  const editProject = computed(() => store.state.employeeDetailModule.editProjectModal);
  const projectsToImport = computed(() => store.state.employeeDetailModule.projectsToImport);

  return {
    newRole,
    projects,
    removeRole,
    addNewRoles,
    editProject,
    updateProject,
    newActivities,
    importProjects,
    openImportModal,
    addNewActivities,
    removeActivities,
    closeImportModal,
    projectsToImport,
    getEmployeeProjects,
    openEditProjectModal,
    closeEditProjectModal,
    selectedProjectsToImport,
  };
};