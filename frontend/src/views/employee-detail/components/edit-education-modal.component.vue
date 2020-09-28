<template>
  <gc-dialog :before-close="closeEditEducationModal"
             :visible.sync="editEducationModal.visibility"
             center
             class="gc-edit-education-modal"
             width="40%">

    <h2 class="gc-edit-education-modal__title"
        v-if="!editEducationModal.isNew">Update education</h2>

    <h2 class="gc-edit-education-modal__title"
        v-else>Create new education</h2>

    <gc-form :modal="editEducationModal.data"
             class="gc-edit-education-modal__form"
             ref="gcEditEducationModal">

      <gc-form-item class="gc-edit-education-modal__form__item"
                    label="School"
                    prop="client">

        <gc-input class="gc-edit-education-modal__form__item__value"
                  placeholder="School name"
                  v-model="editEducationModal.data.schoolName"></gc-input>

      </gc-form-item>

      <div class="gc-edit-education-modal__form__wrapper">

        <gc-form-item class="gc-edit-education-modal__form__item"
                      label="Start education date"
                      prop="client">

          <gc-input class="gc-edit-education-modal__form__item__value"
                    placeholder="Date..."
                    v-model="editEducationModal.data.educationDate[0]"></gc-input>

        </gc-form-item>

        <gc-form-item class="gc-edit-education-modal__form__item"
                      label="End education date"
                      prop="client">

          <gc-input class="gc-edit-education-modal__form__item__value"
                    placeholder="Date..."
                    v-model="editEducationModal.data.educationDate[1]"></gc-input>

        </gc-form-item>
      </div>

      <gc-form-item class="gc-edit-education-modal__form__item"
                    label="Start education date"
                    prop="client">

        <gc-input :autosize="{minRows: 3}"
                  class="gc-edit-education-modal__form__item__value"
                  placeholder="Description"
                  type="textarea"
                  v-model="editEducationModal.data.description"></gc-input>

      </gc-form-item>

      <div class="gc-edit-education-modal__buttons">

        <gc-button @click.native.prevent="closeEditEducationModal"
                   class="button"
                   type="info">Cancel
        </gc-button>

        <gc-button @click.native.prevent="updateEducation"
                   class="button"
                   v-if="!editEducationModal.isNew">Update
        </gc-button>
        <gc-button @click.native.prevent="createEducation"
                   class="button"
                   v-else>Create
        </gc-button>
      </div>

    </gc-form>
  </gc-dialog>
</template>

<script>
import { defineComponent }            from '@vue/composition-api';
import { useEmployeeDetailEducation } from '../hooks/use-employee-detail-education';
import gcButton                       from '@/components/form/button/button.component.vue';
import gcDialog                       from '@/components/dialog/dialog.component.vue';
import gcInput                        from '@/components/form/input/input.component.vue';
import gcForm                         from '@/components/form/form/form.component.vue';
import gcFormItem                     from '@/components/form/form-item/form-item.component.vue';

export default defineComponent({
  name: 'gcEditEducationModal',
  components: {
    gcForm,
    gcInput,
    gcButton,
    gcDialog,
    gcFormItem,
  },
  setup() {

    const {
      createEducation,
      updateEducation,
      editEducationModal,
      closeEditEducationModal,
    } = useEmployeeDetailEducation();

    return {
      createEducation,
      updateEducation,
      editEducationModal,
      closeEditEducationModal,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-edit-education-modal {
  padding: 2rem;

  &__title {
    color: var(--font-color);
    text-align: center;
    font-size: 2.9rem;
    margin-top: 0;
  }

  &__form {
    &__wrapper {
      display: flex;
      justify-content: space-around;

      :first-child {
        margin-right: 5rem;
      }
    }

    &__item {
      width: 100%;

      &__value {
        width: 100%;
      }
    }
  }

  &__buttons {
    margin-top: 3.1rem;
    display: flex;
    justify-content: space-between;
    align-self: center;
  }
}
</style>