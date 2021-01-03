<template>
  <div v-if="Array.isArray(certificates) && certificates.length"
       class="gc-employee-detail-certificate">

    <el-collapse v-model="activeNames"
                 class="gc-employee-detail-certificate__collapse">

      <el-collapse-item class="gc-employee-detail-certificate__collapse__item"
                        name="certificates">

        <template slot="title">
          <span class="gc-employee-detail-certificate__collapse__item__title">Certificates</span>
        </template>

        <div class="gc-employee-detail-certificate__collapse__item__content">

          <gc-certificate v-for="certificate in certificates"
                          :key="certificate.uuid"
                          :detail="certificate"
                          @edit-certificate="openEditModal"
                          @remove-certificate="openDeleteModal"></gc-certificate>

        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { defineComponent }              from '@vue/composition-api';
import { useEmployeeDetail }            from '../../hooks/use-employee-detail';
import { useEmployeeDetailCertificate } from '../../hooks/use-employee-detail-certificate';
import gcCollapse                       from '@/components/collapse/collapse.component.vue';
import gcCollapseItem                   from '@/components/collapse/collapse-item.component.vue';
import gcCertificate                    from '@/components/certificate/certificate.component.vue';

export default defineComponent({
  name: 'gcEmployeeDetailCertificate',
  components: {
    gcCollapse,
    gcCertificate,
    gcCollapseItem,
  },

  setup() {

    const activeNames = 'certificates';

    const {
      profile,
      openDeleteModal,
    } = useEmployeeDetail();

    const {
      certificates,
      openEditModal,
    } = useEmployeeDetailCertificate();

    return {
      profile,
      activeNames,
      certificates,
      openEditModal,
      openDeleteModal,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-employee-detail-certificate {
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