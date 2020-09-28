<template>
  <div class="gc-project-list">

    <gc-filters :search-valie="valueInput"
                :show-button="true"
                :show-checkboxes="false"
                :show-search="true"
                @change-modal-state="changeModalState"
                @change-search="changeSearch"
                button-label="Create new project"></gc-filters>

    <gc-project-list-table></gc-project-list-table>

    <gc-new-project-modal></gc-new-project-modal>

    <gc-delete-modal></gc-delete-modal>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useProjectList }  from './hooks/use-project-list.js';
import store               from '@/store/store';
import gcFilters           from '@/components/filters/filters.component.vue';
import gcNewProjectModal   from './components/project-modal.component.vue';
import gcProjectListTable  from './components/project-list-table.component.vue';
import gcDeleteModal       from './components/delete-modal.component.vue';

export default defineComponent({
  name: 'gcProjectList',
  components: {
    gcFilters,
    gcDeleteModal,
    gcNewProjectModal,
    gcProjectListTable,
  },
  setup() {
    store.dispatch('projectsModule/getProjects');
    store.dispatch('projectsModule/getEmployees');

    const {
      setSort,
      valueInput,
      changeSearch,
      changeModalState,
    } = useProjectList();

    return {
      setSort,
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