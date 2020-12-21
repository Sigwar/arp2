import { computed, ref } from '@vue/composition-api';
import store             from '@/store/store';
import 'moment-precise-range-plugin';

export const useProjectList = () => {

  const valueInput = ref('');
  const loading = ref(false);

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
    store.dispatch('projectsModule/getProjects');
  };

  const changeModalState = () => {
    store.commit('projectsModule/setEditMode', false);
    store.commit('projectsModule/setModal');
    store.commit('projectsModule/resetForm');
  };

  const createNewProject = async () => {
    loading.value = true;
    await store.dispatch('projectsModule/createNewProject', projectForm.value);
    loading.value = false;
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

  const updateProject = async () => {
    loading.value = true;
    await store.dispatch('projectsModule/updateProject');
    loading.value = false;
  };

  return {
    sort,
    modal,
    setSort,
    loading,
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