<template>
  <div class="gc-employee-list">

    <gc-filters :search-valie="valueInput"
                :show-button="true"
                :show-checkboxes="true"
                :show-search="true"
                @change-modal-state="changeModalState"
                @change-search="changeSearch"
                button-label="Create new employee"></gc-filters>

    <gc-employee-list-table></gc-employee-list-table>

    <gc-new-employee-modal></gc-new-employee-modal>

  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useEmployeeList } from './hooks/use-employee-list';
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
      getProjects,
      changeSearch,
      employeesList,
      getKnowledgeTags,
      changeModalState,
    } = useEmployeeList();

    // GET DATA FROM API
    getProjects();
    employeesList();
    getKnowledgeTags();

    return {
      valueInput,
      changeSearch,
      changeModalState,
    };
  },
});
</script>

<style lang="scss"
       scoped>
</style>