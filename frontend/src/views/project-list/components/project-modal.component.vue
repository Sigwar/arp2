<template>
  <gc-dialog :before-close="changeModalState"
             :visible.sync="modal"
             class="gc-project-modal"
             width="42%">

    <h2 class="gc-project-modal__title">Create new project</h2>

    <gc-form :form-ref.sync="refForm"
             :model="projectForm"
             :rules="rules"
             class="gc-project-modal__form">

      <gc-form-item class="gc-project-modal__form__item"
                    label="Project name:"
                    prop="name">

        <gc-input v-model="projectForm.name"
                  class="gc-project-modal__form__item__value"></gc-input>
      </gc-form-item>

      <gc-form-item class="gc-project-modal__form__item"
                    label="Client:"
                    prop="client">

        <gc-input v-model="projectForm.client"
                  class="gc-project-modal__form__item__value"></gc-input>
      </gc-form-item>

      <div class="gc-project-modal__form__wrapper">
        <gc-form-item class="gc-project-modal__form__item"
                      label="Employees:"
                      prop="employees">

          <gc-select v-model="projectForm.employees"
                     collapse-tags
                     multiple>

            <gc-option v-for="employee in employees"
                       :key="employee.uuid"
                       :label="`${employee.name} ${employee.lastName}`"
                       :value="employee.uuid"></gc-option>
          </gc-select>
        </gc-form-item>

        <gc-form-item class="gc-project-modal__form__item"
                      label="Time frame:"
                      prop="date">

          <gc-date-picker v-model="projectForm.date"
                          class="gc-project-modal__form__item__value"
                          end-placeholder="End month"
                          range-separator="-"
                          start-placeholder="Start month"
                          type="monthrange"></gc-date-picker>
        </gc-form-item>
      </div>

      <gc-form-item class="gc-project-modal__form__item"
                    label="Topic:"
                    prop="topic">

        <gc-input v-model="projectForm.topic"
                  class="gc-project-modal__form__item__value"></gc-input>
      </gc-form-item>

      <gc-form-item class="gc-project-modal__form__item"
                    label="Description"
                    prop="description">

        <gc-input v-model="projectForm.description"
                  :autosize="{minRows: 4}"
                  class="gc-project-modal__form__item__value"
                  type="textarea"></gc-input>
      </gc-form-item>

      <div class="gc-project-modal__form__buttons">

        <gc-button class="button"
                   type="info"
                   @click.native.prevent="changeModalState">Cancel
        </gc-button>

        <gc-button v-if="!isEditMode"
                   :loading="loading"
                   class="button"
                   type="default"
                   @click.native.prevent="createNewProject(refForm)">Create
        </gc-button>

        <gc-button v-if="isEditMode"
                   :loading="loading"
                   class="button"
                   type="default"
                   @click.native.prevent="updateProject(refForm)">Update
        </gc-button>
      </div>
    </gc-form>
  </gc-dialog>
</template>

<script>
import { defineComponent }      from '@vue/composition-api';
import { useProjectList }       from '../hooks/use-project-list';
import { useRulesProjectModal } from '../hooks/use-rules-project-modal';
import gcForm                   from '@/components/form/form/form.component.vue';
import gcInput                  from '@/components/form/input/input.component.vue';
import gcDialog                 from '@/components/dialog/dialog.component.vue';
import gcSelect                 from '@/components/form/select/select.component.vue';
import gcOption                 from '@/components/form/select/option.component.vue';
import gcButton                 from '@/components/form/button/button.component.vue';
import gcFormItem               from '@/components/form/form-item/form-item.component.vue';
import gcDatePicker             from '@/components/date-picker/date-picker.component.vue';

export default defineComponent({
  name: 'gcNewProjectModal',
  components: {
    gcForm,
    gcInput,
    gcButton,
    gcSelect,
    gcOption,
    gcDialog,
    gcFormItem,
    gcDatePicker,
  },
  setup() {

    const {
      rules,
      refForm,
    } = useRulesProjectModal();

    const {
      modal,
      loading,
      employees,
      isEditMode,
      projectForm,
      updateProject,
      createNewProject,
      changeModalState,
    } = useProjectList();

    return {
      modal,
      rules,
      refForm,
      loading,
      employees,
      isEditMode,
      projectForm,
      updateProject,
      createNewProject,
      changeModalState,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-project-modal {
  padding: 2rem;

  &__title {
    color: var(--font-color);
    text-align: center;
    font-size: 2.9rem;
    margin-top: 0;
    margin-bottom: 0;
  }

  &__form {
    padding: 3.1rem 5.3rem;

    &__wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      div {
        width: 31rem;
      }
    }

    &__buttons {
      margin-top: 3.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>