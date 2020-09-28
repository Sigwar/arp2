import { computed, ref } from '@vue/composition-api';
import store             from '@/store/store';

export const useEmployeeDetailProjects = () => {

  const selectedProjectsToImport = ref([]);

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
    const params = {
      visibility: false,
      data: {},
    };

    store.commit('employeeDetailModule/setEditProjectModal', params);
  };

  const openImportModal = () => {
    store.commit('employeeDetailModule/setProjectsToImportVisibility', true);
  };

  const closeImportModal = () => {
    selectedProjectsToImport.value = [];
    store.commit('employeeDetailModule/setProjectsToImportVisibility', false);
  };

  const importProjects = () => {
    store.dispatch('employeeDetailModule/importProjects', selectedProjectsToImport.value);
    selectedProjectsToImport.value = [];
  };

  const projects = computed(() => store.state.employeeDetailModule.projects);
  const editProject = computed(() => store.state.employeeDetailModule.editProjectModal);
  const projectsToImport = computed(() => store.state.employeeDetailModule.projectsToImport);

  return {
    projects,
    editProject,
    updateProject,
    importProjects,
    openImportModal,
    closeImportModal,
    projectsToImport,
    openEditProjectModal,
    closeEditProjectModal,
    selectedProjectsToImport,
  };
};