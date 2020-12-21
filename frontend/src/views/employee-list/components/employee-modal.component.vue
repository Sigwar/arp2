<template>
  <gc-dialog :before-close="resetEmployeeForm"
             :visible.sync="isModalOpen"
             center
             class="gc-employee-modal"
             width="45%">

    <h2 class="gc-employee-modal__title">Create new employee</h2>

    <gc-form ref="gcNewProjectModal"
             :modal="employeeForm"
             class="gc-employee-modal__form">

      <div class="gc-employee-modal__form__row">

        <div class="gc-employee-modal__form__row__wrapper gc-employee-modal__form__row__wrapper--no-margin">
          <gc-form-item class="gc-employee-modal__form__item"
                        label="Name"
                        prop="name">

            <gc-input v-model="employeeForm.name"
                      class="gc-employee-modal__form__item__value"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-employee-modal__form__item"
                        label="Last name:"
                        prop="latName">

            <gc-input v-model="employeeForm.lastName"
                      class="gc-employee-modal__form__item__value"></gc-input>
          </gc-form-item>
        </div>
      </div>

      <div class="gc-employee-modal__form__row">

        <div class="gc-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-employee-modal__form__item"
                        label="Profession"
                        prop="profession">

            <gc-select v-model="employeeForm.profession"
                       default-first-option
                       filterable
                       placeholder="Select profession...">

              <gc-option v-for="prof in professions"
                         :key="prof"
                         :label="prof"
                         :value="prof"></gc-option>
            </gc-select>
          </gc-form-item>

          <gc-form-item class="gc-employee-modal__form__item gc-employee-modal__form__item"
                        label="Level"
                        prop="level">

            <gc-select v-model="employeeForm.level"
                       default-first-option
                       filterable
                       placeholder="Select level...">

              <gc-option v-for="level in levelList"
                         :key="level"
                         :label="level"
                         :value="level"></gc-option>
            </gc-select>
          </gc-form-item>
        </div>

        <div class="gc-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-employee-modal__form__item"
                        label="Birthday"
                        prop="birthday">

            <gc-input v-model="employeeForm.birthday"
                      class="gc-employee-modal__form__item__value"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-employee-modal__form__item"
                        label="IT Experience:"
                        prop="itExperience">

            <gc-date-picker v-model="employeeForm.itExperience"
                            class="gc-employee-modal__form__item__value"
                            placeholder="Pick a year and month"
                            type="month"></gc-date-picker>
          </gc-form-item>
        </div>

        <div class="gc-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-employee-modal__form__item"
                        label="Languages"
                        prop="languages">

            <gc-select v-model="employeeForm.languages"
                       collapse-tags
                       default-first-option
                       filterable
                       multiple
                       placeholder="Select languages...">

              <gc-option v-for="lng in languages"
                         :key="lng"
                         :label="lng"
                         :value="lng"></gc-option>
            </gc-select>

          </gc-form-item>

          <gc-form-item class="gc-employee-modal__form__item gc-employee-modal__form__item--switch"
                        label="Active"
                        prop="active">

            <gc-switch v-model="employeeForm.isActive"
                       class="gc-employee-modal__form__item__value"></gc-switch>
          </gc-form-item>
        </div>
      </div>

      <gc-form-item class="gc-employee-modal__form__item"
                    label="IT knowledge:"
                    prop="itKnowledge">

        <gc-select v-model="employeeForm.itKnowledge"
                   default-first-option
                   filterable
                   multiple
                   placeholder="Select knowledge...">

          <gc-option v-for="tag in itTechnologies"
                     :key="tag"
                     :label="tag"
                     :value="tag"></gc-option>
        </gc-select>
      </gc-form-item>

      <gc-form-item class="gc-employee-modal__form__item"
                    label="Project:"
                    prop="projects">

        <gc-select v-model="employeeForm.projects"
                   collapse-tags
                   default-first-option
                   filterable
                   multiple
                   placeholder="Select projects...">

          <gc-option v-for="project in projects"
                     :key="project.uuid"
                     :label="`${project.name} - ${project.client}`"
                     :value="project.uuid"></gc-option>
        </gc-select>
      </gc-form-item>

      <div class="gc-employee-modal__form__buttons">

        <gc-button class="button"
                   type="info"
                   @click.native.prevent="resetEmployeeForm">Cancel
        </gc-button>

        <gc-button :loading="loadingBtn"
                   class="button"
                   type="default"
                   @click.native.prevent="createNewEmployee">Create
        </gc-button>
      </div>
    </gc-form>
  </gc-dialog>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useEmployeeList } from '../hooks/use-employee-list';
import { useGlobals }      from '../../../hooks/use-globals';
import gcForm              from '@/components/form/form/form.component.vue';
import gcInput             from '@/components/form/input/input.component.vue';
import gcDialog            from '@/components/dialog/dialog.component.vue';
import gcSelect            from '@/components/form/select/select.component.vue';
import gcOption            from '@/components/form/select/option.component.vue';
import gcButton            from '@/components/form/button/button.component.vue';
import gcUpload            from '@/components/upload/uplaod.component.vue';
import gcSwitch            from '@/components/form/switch/switch.component.vue';
import gcFormItem          from '@/components/form/form-item/form-item.component.vue';
import gcDatePicker        from '@/components/date-picker/date-picker.component.vue';

export default defineComponent({
  name: 'gcNewEmployeeModal',
  components: {
    gcForm,
    gcInput,
    gcSwitch,
    gcButton,
    gcSelect,
    gcOption,
    gcUpload,
    gcDialog,
    gcFormItem,
    gcDatePicker,
  },
  setup() {

    const {
      loadingBtn,
      isModalOpen,
      employeeForm,
      createNewEmployee,
      resetEmployeeForm,
    } = useEmployeeList();

    const {
      projects,
      levelList,
      languages,
      professions,
      knowledgeTags,
      itTechnologies,
    } = useGlobals();

    return {
      projects,
      languages,
      levelList,
      loadingBtn,
      isModalOpen,
      professions,
      employeeForm,
      knowledgeTags,
      itTechnologies,
      createNewEmployee,
      resetEmployeeForm,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-employee-modal {
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

    &__row {
      display: flex;

      &__avatar-uploader {
        min-width: 19rem;
        max-width: 19rem;
        height: 19rem;
        border: 1px dashed var(--gray-light);
        margin-right: 3.1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          border: 1px dashed var(--warning);
          box-shadow: var(--input-shadow);
          transition: var(--transition);
        }
      }

      &__wrapper {
        width: 100%;

        &:first-child,
        &:nth-child(2) {
          margin-right: 2.1rem;
        }

        &--no-margin {
          display: flex;
          justify-content: space-between;
          margin-right: 0;

          .gc-employee-modal__form__item {
            width: 100%;
            margin-right: 2.1rem;

            &:nth-child(2) {
              margin-right: 0;
            }
          }

          &:first-child,
          &:nth-child(2) {
            margin-right: 0;
          }
        }
      }
    }

    &__item {
      &--switch {
        display: flex;
        margin-top: 4.3rem;
        align-items: center;
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