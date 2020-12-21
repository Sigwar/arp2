<template>
  <div v-if="Array.isArray(educations) && educations.length"
       class="gc-employee-detail-education">

    <el-collapse v-model="activeNames"
                 class="gc-employee-detail-education__collapse">

      <el-collapse-item class="gc-employee-detail-education__collapse__item"
                        name="education">

        <template slot="title">
          <span class="gc-employee-detail-education__collapse__item__title">Education</span>
        </template>

        <div class="gc-employee-detail-education__collapse__item__content">

          <gc-education v-for="education in educations"
                        :key="education.uuid"
                        :detail="education"
                        @edit-education="openEditModal"
                        @remove-education="openDeleteModal"></gc-education>

        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { defineComponent }            from '@vue/composition-api';
import { useEmployeeDetail }          from '../../hooks/use-employee-detail';
import { useEmployeeDetailEducation } from '../../hooks/use-employee-detail-education';
import gcCollapse                     from '@/components/collapse/collapse.component.vue';
import gcCollapseItem                 from '@/components/collapse/collapse-item.component.vue';
import gcEducation                    from '@/components/education/education.component.vue';

export default defineComponent({
  name: 'gcEmployeeDetailEducation',
  components: {
    gcCollapse,
    gcEducation,
    gcCollapseItem,
  },

  setup() {

    const activeNames = 'education';

    const {
      profile,
      openDeleteModal,
    } = useEmployeeDetail();

    const {
      educations,
      openEditModal,
    } = useEmployeeDetailEducation();

    return {
      profile,
      educations,
      activeNames,
      openEditModal,
      openDeleteModal,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-employee-detail-education {
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
        margin-left: 19rem;

        &__wrapper {
          display: flex;
        }
      }
    }
  }
}
</style>