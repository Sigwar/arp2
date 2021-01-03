<template>
  <div v-if="Array.isArray(projects) && projects.length"
       class="gc-employee-detail-projects">

    <el-collapse v-model="activeNames"
                 class="gc-employee-detail-projects__collapse">

      <el-collapse-item class="gc-employee-detail-projects__collapse__item"
                        name="Projects">

        <template slot="title">
          <span class="gc-employee-detail-projects__collapse__item__title">Projects</span>
        </template>

        <div class="gc-employee-detail-projects__collapse__item__content">

          <gc-project v-for="project in projects"
                      :key="project.uuid"
                      :detail="project"
                      :show-description="pdfSettings.showDescriptionProject"
                      :show-topic="pdfSettings.showTopicProject"
                      @edit-project="openEditProjectModal"
                      @remove-project="openDeleteModal"></gc-project>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { defineComponent }           from '@vue/composition-api';
import { useEmployeeDetailProjects } from '../../hooks/use-employee-detail-projects';
import { useEmployeeDetail }         from '../../hooks/use-employee-detail';
import { usePdfGenerator }           from '../../hooks/use-pdf-generator';
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
      pdfSettings,
    } = usePdfGenerator();

    const {
      openDeleteModal,
    } = useEmployeeDetail();

    const {
      projects,
      openEditProjectModal,
    } = useEmployeeDetailProjects();

    return {
      projects,
      pdfSettings,
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
  margin-bottom: 5rem;

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
        margin-left: 18rem;

        &__wrapper {
          display: flex;
        }
      }
    }
  }
}
</style>