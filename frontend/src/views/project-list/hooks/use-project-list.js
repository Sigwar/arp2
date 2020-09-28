import { computed, ref } from '@vue/composition-api';
import store             from '@/store/store';

export const useProjectList = () => {

  const valueInput = ref('');

  const sort = computed(() => store.state.projectsModule.sort);
  const isEditMode = computed(() => store.state.projectsModule.isEditMode);
  const projects = computed(() => store.state.projectsModule.projects);
  const modal = computed(() => store.state.projectsModule.isModalOpen);
  const employees = computed(() => store.state.projectsModule.employees);
  const projectForm = computed(() => store.state.projectsModule.projectForm);
  const isDeleteModal = computed(() => store.state.projectsModule.isDeleteModal);
  const projectToDelete = computed(() => store.state.projectsModule.projectToDelete);

  const changeSearch = (value) => {
    valueInput.value = value;
  };

  const setSort = (value) => {
    store.commit('projectsModule/setSort', value);
  };

  const changeModalState = () => {
    store.commit('projectsModule/setEditMode', false);
    store.commit('projectsModule/setModal');
    store.commit('projectsModule/resetForm');
  };

  const createNewProject = () => {
    store.dispatch('projectsModule/createNewProject');
  };

  const closeDeleteModal = () => {
    store.commit('projectsModule/setDeleteModal');
    store.commit('projectsModule/resetProjectToDelete');
  };

  const setProjectToDelete = (project) => {
    store.commit('projectsModule/setProjectToDelete', project);
    store.commit('projectsModule/setDeleteModal');
  };

  const deleteProject = () => {
    store.dispatch('projectsModule/deleteProject');
  };

  const setProjectDetail = (project) => {
    store.commit('projectsModule/setEditMode', true);
    store.dispatch('projectsModule/getProjectDetail', project.uuid);
  };

  const updateProject = () => {
    store.dispatch('projectsModule/updateProject');
  };

  return {
    sort,
    modal,
    setSort,
    projects,
    employees,
    isEditMode,
    valueInput,
    projectForm,
    changeSearch,
    deleteProject,
    isDeleteModal,
    updateProject,
    projectToDelete,
    createNewProject,
    changeModalState,
    setProjectDetail,
    closeDeleteModal,
    setProjectToDelete,
  };
};