<template>
  <div class="gc-employee-list">

    <gc-filters :search-valie="valueInput"
                :show-button="true"
                :show-checkboxes="true"
                :show-search="true"
                button-label="Create new employee"
                @change-boxes="changeFilterBoxes"
                @change-modal-state="changeModalState"
                @change-search="changeSearch"></gc-filters>

    <gc-employee-list-table></gc-employee-list-table>

    <gc-new-employee-modal></gc-new-employee-modal>

  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useEmployeeList } from './hooks/use-employee-list';
import { useGlobals }      from '../../hooks/use-globals';
import gcFilters           from '@/components/filters/filters.component.vue';
import gcEmployeeListTable from './components/employee-list-table.component.vue';
import gcNewEmployeeModal  from './components/employee-modal.component.vue';

export default defineComponent({
  name: 'gcEmployeeList',
  components: {
    gcFilters,
    gcNewEmployeeModal,
    gcEmployeeListTable,
  },

  setup() {

    const {
      valueInput,
      changeSearch,
      employeesList,
      changeModalState,
      changeFilterBoxes,
    } = useEmployeeList();

    const {
      getProjects,
      getLanguages,
      getLevelList,
      getWorkstation,
      getItTechnologies,
    } = useGlobals();

    // GET DATA FROM API
    getProjects();
    getLanguages();
    getLevelList();
    employeesList();
    getWorkstation();
    getItTechnologies();

    return {
      valueInput,
      changeSearch,
      changeModalState,
      changeFilterBoxes,
    };
  },
});
</script>

<style lang="scss"
       scoped>
</style>