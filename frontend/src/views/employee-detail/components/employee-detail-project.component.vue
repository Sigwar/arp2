<template>
  <div class="gc-employee-detail-projects">

    <el-collapse class="gc-employee-detail-projects__collapse"
                 v-model="activeNames">

      <el-collapse-item class="gc-employee-detail-projects__collapse__item"
                        name="Projects">

        <template slot="title">
          <span class="gc-employee-detail-projects__collapse__item__title">Projects</span>
        </template>

        <div class="gc-employee-detail-projects__collapse__item__content">

          <gc-project :detail="project"
                      :key="project.uuid"
                      @edit-project="openEditProjectModal"
                      @remove-project="openDeleteModal"
                      v-for="project in projects"></gc-project>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { defineComponent }           from '@vue/composition-api';
import { useEmployeeDetailProjects } from '../hooks/use-employee-detail-projects';
import { useEmployeeDetail }         from '../hooks/use-employee-detail';
import gcProject                     from '@/components/project/project.component.vue';
import gcCollapse                    from '@/components/collapse/collapse.component.vue';
import gcCollapseItem                from '@/components/collapse/collapse-item.component.vue';

export default defineComponent({
  name: 'gcEmployeeDetailProject',
  components: {
    gcProject,
    gcCollapse,
    gcCollapseItem,
  },
  setup() {

    const activeNames = 'Projects';

    const {
      openDeleteModal,
    } = useEmployeeDetail();

    const {
      projects,
      openEditProjectModal,
    } = useEmployeeDetailProjects();

    return {
      projects,
      activeNames,
      openDeleteModal,
      openEditProjectModal,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-employee-detail-projects {
  &__collapse {
    &__item {
      &__title {
        padding: 0 3.1rem;
        background: var(--primary-color);
        border-bottom: 1px solid var(--primary-color);
        font-weight: var(--font-bold);
        font-size: 1.9rem;
        letter-spacing: 4px;
      }

      &__content {
        padding: 2rem;
        margin-left: 19rem;

        &__wrapper {
          display: flex;
        }
      }
    }
  }
}
</style>