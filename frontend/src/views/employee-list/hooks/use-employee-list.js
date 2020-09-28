import { computed, ref } from '@vue/composition-api';
import store             from '@/store/store';
import router            from '@/router';

export const useEmployeeList = () => {

  const employeesList = () => {
    store.dispatch('employeesModule/getEmployees');
  };

  const getKnowledgeTags = () => {
    store.dispatch('employeesModule/getTagsKnowledge');
  };

  const getProjects = () => {
    store.dispatch('employeesModule/getProjects');
  };

  const valueInput = ref('');

  const sort = computed(() => store.state.employeesModule.sort);
  const employees = computed(() => store.state.employeesModule.employees);
  const employeeForm = computed(() => store.state.employeesModule.employeeForm);
  const isModalOpen = computed(() => store.state.employeesModule.isModalOpen);
  const knowledgeTags = computed(() => store.state.employeesModule.knowledgeTags);
  const professionList = computed(() => store.state.employeesModule.professionList);
  const projects = computed(() => store.state.employeesModule.projects);

  const changeSearch = (value) => {
    valueInput.value = value;
  };

  const setSort = (value) => {
    store.commit('employeesModule/setSort', value);
  };

  const changeModalState = () => {
    store.commit('employeesModule/setIsModalOpen', true);
  };

  const createNewEmployee = () => {
    store.dispatch('employeesModule/createNewEmployee');
  };

  const resetEmployeeForm = () => {
    store.commit('employeesModule/resetEmployeeForm');
    store.commit('employeesModule/setIsModalOpen', false);
  };

  const handleAvatarSuccess = (file) => {
    const blobFile = new Blob([ file.target.files[ 0 ] ], { type: file.target.files [ 0 ].type });
    store.commit('employeesModule/setEmployeePicture', blobFile);
  };

  const goToDetail = (uuid) => {
    router.push({ name: 'Employee detail', params: { uuid: uuid } }).catch(() => {});
  };

  return {
    sort,
    setSort,
    projects,
    employees,
    goToDetail,
    valueInput,
    isModalOpen,
    getProjects,
    employeeForm,
    changeSearch,
    employeesList,
    knowledgeTags,
    professionList,
    getKnowledgeTags,
    changeModalState,
    createNewEmployee,
    resetEmployeeForm,
    handleAvatarSuccess,
  };
};