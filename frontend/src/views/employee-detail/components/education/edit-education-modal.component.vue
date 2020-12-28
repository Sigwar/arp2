<template>
  <gc-dialog :before-close="closeEditEducationModal"
             :visible.sync="editEducationModal.visibility"
             center
             class="gc-edit-education-modal"
             width="40%">

    <h2 v-if="!editEducationModal.isNew"
        class="gc-edit-education-modal__title">Update education</h2>

    <h2 v-else
        class="gc-edit-education-modal__title">Create new education</h2>

    <gc-form :form-ref.sync="refForm"
             :rules="rulesEducation"
             :model="editEducationModal.data"
             class="gc-edit-education-modal__form">

      <gc-form-item class="gc-edit-education-modal__form__item"
                    label="School"
                    prop="schoolName">

        <gc-input v-model="editEducationModal.data.schoolName"
                  class="gc-edit-education-modal__form__item__value"
                  placeholder="School name"></gc-input>

      </gc-form-item>

      <gc-form-item class="gc-edit-education-modal__form__item gc-edit-education-modal__form__item--date-picker"
                    label="Education date"
                    prop="date">

        <gc-date-picker v-model="editEducationModal.data.date"
                        class="gc-edit-education-modal__form__item__value"
                        placeholder="Date..."
                        range-separator="-"
                        type="monthrange"></gc-date-picker>

      </gc-form-item>

      <gc-form-item class="gc-edit-education-modal__form__item"
                    label="Description"
                    prop="description">

        <gc-input v-model="editEducationModal.data.description"
                  :autosize="{minRows: 3}"
                  class="gc-edit-education-modal__form__item__value"
                  placeholder="Description"
                  type="textarea"></gc-input>

      </gc-form-item>

      <div class="gc-edit-education-modal__buttons">

        <gc-button class="button"
                   type="info"
                   @click.native.prevent="closeEditEducationModal">Cancel
        </gc-button>

        <gc-button v-if="!editEducationModal.isNew"
                   class="button"
                   @click.native.prevent="updateEducation(refForm, employeeUuid)">Update
        </gc-button>
        <gc-button v-else
                   class="button"
                   @click.native.prevent="createEducation(refForm, employeeUuid)">Create
        </gc-button>
      </div>
    </gc-form>
  </gc-dialog>
</template>

<script>
import { defineComponent }            from '@vue/composition-api';
import { useEmployeeDetailEducation } from '../../hooks/use-employee-detail-education';
import { useRulesEmployeeDetail }     from '../../rules/use-rules-employee-detail';
import gcButton                       from '@/components/form/button/button.component.vue';
import gcDialog                       from '@/components/dialog/dialog.component.vue';
import gcInput                        from '@/components/form/input/input.component.vue';
import gcForm                         from '@/components/form/form/form.component.vue';
import gcFormItem                     from '@/components/form/form-item/form-item.component.vue';
import gcDatePicker                   from '@/components/date-picker/date-picker.component.vue';

export default defineComponent({
  name: 'gcEditEducationModal',
  components: {
    gcForm,
    gcInput,
    gcButton,
    gcDialog,
    gcFormItem,
    gcDatePicker,
  },
  setup(props, { root }) {
    const employeeUuid = root.$route.params.uuid;

    const {
      refForm,
      rulesEducation,
    } = useRulesEmployeeDetail();

    const {
      createEducation,
      updateEducation,
      editEducationModal,
      closeEditEducationModal,
    } = useEmployeeDetailEducation();

    return {
      refForm,
      employeeUuid,
      rulesEducation,
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

      &--date-picker {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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