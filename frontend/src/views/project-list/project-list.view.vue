<template>
  <div class="gc-project-list">

    <gc-filters :search-valie="valueInput"
                :show-button="true"
                :show-checkboxes="false"
                :show-search="true"
                button-label="Create new project"
                @change-modal-state="changeModalState"
                @change-search="changeSearch"></gc-filters>

    <gc-project-list-table></gc-project-list-table>

    <gc-new-project-modal></gc-new-project-modal>

    <gc-delete-modal></gc-delete-modal>
  </div>
</template>

<script>
import { defineComponent, onUnmounted } from '@vue/composition-api';
import { useProjectList }               from './hooks/use-project-list.js';
import store                            from '@/store/store';
import projectListModule                from './store/projects.store';
import gcFilters                        from '@/components/filters/filters.component.vue';
import gcNewProjectModal                from './components/project-modal.component.vue';
import gcProjectListTable               from './components/project-list-table.component.vue';
import gcDeleteModal                    from './components/delete-modal.component.vue';

export default defineComponent({
  name: 'gcProjectList',
  components: {
    gcFilters,
    gcDeleteModal,
    gcNewProjectModal,
    gcProjectListTable,
  },
  setup() {
    store.registerModule('projectsModule', projectListModule);
    store.dispatch('projectsModule/getProjects');

    onUnmounted(() => {
      store.unregisterModule('projectsModule');
    });

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