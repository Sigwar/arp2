<template>
  <gc-dialog :before-close="closeDeleteModal"
             :visible.sync="deleteModalData.visibility"
             center
             class="delete-modal">

    <h2 class="delete-modal__title">Are you sure you want
      <span class="delete-modal__title__highlighted">remove:</span>
    </h2>

    <p class="delete-modal__content">
      <span v-if="deleteModalData.data.type === 'education'">{{ deleteModalData.data.name }}</span>
      <span v-if="deleteModalData.data.type === 'project'">{{ deleteModalData.data.name }} for {{ deleteModalData.data.client }}</span>
      <span v-if="deleteModalData.data.type === 'certificate'">{{ deleteModalData.data.name }}</span>
    </p>

    <div class="delete-modal__buttons">

      <gc-button class="button"
                 type="info"
                 @click.native.prevent="closeDeleteModal">Cancel
      </gc-button>

      <gc-button class="button"
                 type="danger"
                 @click.native.prevent="deleteItem(employeeUuid)">Delete
      </gc-button>
    </div>
  </gc-dialog>
</template>

<script>
import { defineComponent }            from '@vue/composition-api';
import { useEmployeeDetail }          from '../hooks/use-employee-detail';
import { useEmployeeDetailEducation } from '../hooks/use-employee-detail-education';
import gcButton                       from '@/components/form/button/button.component.vue';
import gcDialog                       from '@/components/dialog/dialog.component.vue';

export default defineComponent({
  name: 'gcNewProjectModal',
  components: {
    gcButton,
    gcDialog,
  },

  setup(props, { root }) {
    const employeeUuid = root.$route.params.uuid;

    const {
      deleteModalData,
      closeDeleteModal,
    } = useEmployeeDetail();

    const {
      deleteItem,
    } = useEmployeeDetailEducation();

    return {
      deleteItem,
      employeeUuid,
      deleteModalData,
      closeDeleteModal,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.delete-modal {
  padding: 2rem;

  &__title {
    color: var(--font-color);
    text-align: center;
    font-size: 2.9rem;
    margin-top: 0;

    &__highlighted {
      color: var(--red);
    }
  }

  &__content {
    text-align: center;
    font-size: 4.1rem;
    color: var(--gray-dark);
    margin: 2.1rem;
    letter-spacing: 2px;
    word-break: break-word;

    &__insertion {
      font-size: 2.7rem;
      color: var(--gray-light);
      letter-spacing: normal;
    }
  }

  &__buttons {
    margin-top: 3.1rem;
    padding: 0 3.1rem;
    display: flex;
    justify-content: space-between;
    align-self: center;
  }
}
</style>