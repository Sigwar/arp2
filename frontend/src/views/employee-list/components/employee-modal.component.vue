<template>
  <gc-dialog :before-close="resetEmployeeForm"
             :visible.sync="isModalOpen"
             center
             class="gc-employee-modal"
             width="45%">

    <h2 class="gc-employee-modal__title">Create new employee</h2>

    <gc-form :modal="employeeForm"
             class="gc-employee-modal__form"
             ref="gcNewProjectModal">

      <div class="gc-employee-modal__form__row">

        <div @click="$refs.pictureUpload.click()"
             class="gc-employee-modal__form__row__avatar-uploader">

          <input @change="handleAvatarSuccess"
                 class="avatar-input"
                 ref="pictureUpload"
                 type="file" />

          <img :alt="employeeForm.name"
               :src="employeeForm.picture.url"
               class="picture"
               v-if="employeeForm.picture.url !== ''" />

          <i class="el-icon-plus avatar-uploader-icon"
             v-if="employeeForm.picture.url === ''"></i>
        </div>

        <div class="gc-employee-modal__form__row__wrapper gc-employee-modal__form__row__wrapper--no-margin">
          <gc-form-item class="gc-employee-modal__form__item"
                        label="Name"
                        prop="name">

            <gc-input class="gc-employee-modal__form__item__value"
                      v-model="employeeForm.name"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-employee-modal__form__item"
                        label="Last name:"
                        prop="latName">

            <gc-input class="gc-employee-modal__form__item__value"
                      v-model="employeeForm.lastName"></gc-input>
          </gc-form-item>
        </div>
      </div>

      <div class="gc-employee-modal__form__row">

        <div class="gc-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-employee-modal__form__item"
                        label="Profession"
                        prop="profession">

            <gc-input class="gc-employee-modal__form__item__value"
                      v-model="employeeForm.profession"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-employee-modal__form__item gc-employee-modal__form__item"
                        label="Level"
                        prop="level">

            <gc-select allow-create
                       default-first-option
                       filterable
                       placeholder="Select level..."
                       v-model="employeeForm.level">

              <gc-option :key="profession"
                         :label="profession"
                         :value="profession"
                         v-for="profession in professionList"></gc-option>
            </gc-select>
          </gc-form-item>
        </div>

        <div class="gc-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-employee-modal__form__item"
                        label="Birthday"
                        prop="birthDay">

            <gc-input class="gc-employee-modal__form__item__value"
                      v-model="employeeForm.birthDay"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-employee-modal__form__item"
                        label="IT Experience:"
                        prop="itExperience">

            <gc-input class="gc-employee-modal__form__item__value"
                      v-model="employeeForm.itExperience"></gc-input>
          </gc-form-item>
        </div>

        <div class="gc-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-employee-modal__form__item"
                        label="Language"
                        prop="language">

            <gc-input class="gc-employee-modal__form__item__value"
                      v-model="employeeForm.language"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-employee-modal__form__item gc-employee-modal__form__item--switch"
                        label="Active"
                        prop="active">

            <gc-switch class="gc-employee-modal__form__item__value"
                       v-model="employeeForm.isActive"></gc-switch>
          </gc-form-item>
        </div>
      </div>

      <gc-form-item class="gc-employee-modal__form__item"
                    label="IT knowledge:"
                    prop="itKnowledge">

        <gc-select allow-create
                   default-first-option
                   filterable
                   multiple
                   placeholder="Select knowledge..."
                   v-model="employeeForm.itKnowledge">

          <gc-option :key="tag"
                     :label="tag"
                     :value="tag"
                     v-for="tag in knowledgeTags"></gc-option>
        </gc-select>
      </gc-form-item>

      <gc-form-item class="gc-employee-modal__form__item"
                    label="Project:"
                    prop="projects">

        <gc-select allow-create
                   default-first-option
                   filterable
                   multiple
                   placeholder="Select projects..."
                   v-model="employeeForm.projects">

          <gc-option :key="project.uuid"
                     :label="project.label"
                     :value="project.uuid"
                     v-for="project in projects"></gc-option>
        </gc-select>
      </gc-form-item>

      <div class="gc-employee-modal__form__buttons">

        <gc-button @click.native.prevent="resetEmployeeForm"
                   class="button"
                   type="info">Cancel
        </gc-button>

        <gc-button @click.native.prevent="createNewEmployee"
                   class="button"
                   type="default">Create
        </gc-button>
      </div>
    </gc-form>
  </gc-dialog>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useEmployeeList } from '../hooks/use-employee-list';
import gcForm              from '@/components/form/form/form.component.vue';
import gcInput             from '@/components/form/input/input.component.vue';
import gcDialog            from '@/components/dialog/dialog.component.vue';
import gcSelect            from '@/components/form/select/select.component.vue';
import gcOption            from '@/components/form/select/option.component.vue';
import gcButton            from '@/components/form/button/button.component.vue';
import gcFormItem          from '@/components/form/form-item/form-item.component.vue';
import gcUpload            from '@/components/upload/uplaod.component.vue';
import gcSwitch            from '@/components/form/switch/switch.component.vue';

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
  },
  setup() {

    const {
      projects,
      isModalOpen,
      employeeForm,
      knowledgeTags,
      professionList,
      createNewEmployee,
      resetEmployeeForm,
      handleAvatarSuccess,
    } = useEmployeeList();

    return {
      projects,
      isModalOpen,
      employeeForm,
      knowledgeTags,
      professionList,
      createNewEmployee,
      resetEmployeeForm,
      handleAvatarSuccess,
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

        .avatar-input {
          display: none;
        }

        .picture {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }

      &__wrapper {
        width: 100%;

        &:first-child,
        &:nth-child(2) {
          margin-right: 2.1rem;
        }

        &--no-margin {
          margin-right: 0;

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