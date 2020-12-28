import { computed, ref } from '@vue/composition-api';
import store             from '@/store/store';
import router            from '@/router';

export const useEmployeeList = () => {

  const valueInput = ref('');

  const sort = computed(() => store.state.employeesModule.sort);
  const employees = computed(() => store.state.employeesModule.employees);
  const employeeForm = computed(() => store.state.employeesModule.employeeForm);
  const isModalOpen = computed(() => store.state.employeesModule.isModalOpen);
  const projects = computed(() => store.state.employeesModule.projects);
  const loadingBtn = computed(() => store.state.employeesModule.loadingBtn);

  const changeSearch = (value) => {
    valueInput.value = value;
  };

  const employeesList = () => {
    store.dispatch('employeesModule/getEmployees');
  };

  const getProjects = () => {
    store.dispatch('employeesModule/getProjects');
  };

  const setSort = (value) => {
    store.commit('employeesModule/setSort', value);
    store.dispatch('employeesModule/getEmployees');
  };

  const changeModalState = () => {
    store.commit('employeesModule/setIsModalOpen', true);
  };

  const createNewEmployee = (form) => {

    form.validate((valid) => {
      if (valid) {
        store.dispatch('employeesModule/createNewEmployee');
      }
    });
  };

  const resetEmployeeForm = () => {
    store.commit('employeesModule/resetEmployeeForm');
    store.commit('employeesModule/setIsModalOpen', false);
  };

  const goToDetail = (uuid) => {
    router.push({ name: 'Employee detail', params: { uuid: uuid } }).catch(() => {
    });
  };

  const changeFilterBoxes = (value) => {
    store.commit('employeesModule/setStatusSearch', value);
    store.dispatch('employeesModule/getEmployees');
  };

  return {
    sort,
    setSort,
    projects,
    employees,
    goToDetail,
    valueInput,
    loadingBtn,
    isModalOpen,
    getProjects,
    employeeForm,
    changeSearch,
    employeesList,
    changeModalState,
    createNewEmployee,
    changeFilterBoxes,
    resetEmployeeForm,
  };
};