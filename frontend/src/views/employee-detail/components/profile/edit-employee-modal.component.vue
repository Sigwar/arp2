<template>
  <gc-dialog :before-close="closeEditProfileModal"
             :visible.sync="editProfileModal"
             center
             class="gc-edit-employee-modal"
             width="45%">

    <h2 class="gc-edit-employee-modal__title">Update employee</h2>

    <gc-form :form-ref.sync="refForm"
             :model="profileModal"
             :rules="rules"
             class="gc-edit-employee-modal__form">

      <div class="gc-edit-employee-modal__form__row">

        <div class="gc-edit-employee-modal__form__row__wrapper gc-edit-employee-modal__form__row__wrapper--no-margin">
          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="Name"
                        prop="name">

            <gc-input v-model="profileModal.name"
                      class="gc-edit-employee-modal__form__item__value"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="Last name:"
                        prop="lastName">

            <gc-input v-model="profileModal.lastName"
                      class="gc-edit-employee-modal__form__item__value"></gc-input>
          </gc-form-item>
        </div>
      </div>

      <div class="gc-edit-employee-modal__form__row">

        <div class="gc-edit-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="Profession"
                        prop="profession">

            <gc-select v-model="profileModal.profession"
                       default-first-option
                       filterable
                       placeholder="Select profession...">

              <gc-option v-for="prof in professions"
                         :key="prof"
                         :label="prof"
                         :value="prof"></gc-option>
            </gc-select>
          </gc-form-item>

          <gc-form-item class="gc-edit-employee-modal__form__item gc-edit-employee-modal__form__item"
                        label="Level"
                        prop="level">

            <gc-select v-model="profileModal.level"
                       allow-create
                       default-first-option
                       filterable
                       placeholder="Select level...">

              <gc-option v-for="lvl in levelList"
                         :key="lvl"
                         :label="lvl"
                         :value="lvl"></gc-option>
            </gc-select>
          </gc-form-item>
        </div>

        <div class="gc-edit-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="Birthday"
                        prop="birthDay">

            <gc-input v-model="profileModal.birthday"
                      class="gc-edit-employee-modal__form__item__value"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="IT Experience:"
                        prop="itExperience">

            <gc-date-picker v-model="profileModal.itExperience"
                            class="gc-edit-employee-modal__form__item__value"
                            placeholder="Pick a year and month"
                            type="month"></gc-date-picker>
          </gc-form-item>
        </div>

        <div class="gc-edit-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="Languages"
                        prop="languages">


            <gc-select v-model="profileModal.languages"
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

          <gc-form-item class="gc-edit-employee-modal__form__item gc-edit-employee-modal__form__item--switch"
                        label="Active"
                        prop="active">

            <gc-switch v-model="profileModal.isActive"
                       class="gc-edit-employee-modal__form__item__value"></gc-switch>
          </gc-form-item>
        </div>
      </div>

      <gc-form-item class="gc-edit-employee-modal__form__item"
                    label="IT knowledge:"
                    prop="itKnowledge">

        <gc-select v-model="profileModal.itTechnologies"
                   allow-create
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

      <div class="gc-edit-employee-modal__form__buttons">

        <gc-button class="button"
                   type="info"
                   @click.native.prevent="closeEditProfileModal">Cancel
        </gc-button>

        <gc-button class="button"
                   type="default"
                   @click.native.prevent="updateProfile(refForm)">Update
        </gc-button>
      </div>
    </gc-form>
  </gc-dialog>
</template>

<script>
import { defineComponent }          from '@vue/composition-api';
import { useEmployeeDetailProfile } from '../../hooks/use-employee-detail-profile';
import { useGlobals }               from '../../../../hooks/use-globals';
import { useRulesEmployeeModal }    from '../../../../hooks/use-rules-employee-modal';
import gcForm                       from '@/components/form/form/form.component.vue';
import gcInput                      from '@/components/form/input/input.component.vue';
import gcDialog                     from '@/components/dialog/dialog.component.vue';
import gcSelect                     from '@/components/form/select/select.component.vue';
import gcOption                     from '@/components/form/select/option.component.vue';
import gcButton                     from '@/components/form/button/button.component.vue';
import gcFormItem                   from '@/components/form/form-item/form-item.component.vue';
import gcUpload                     from '@/components/upload/uplaod.component.vue';
import gcSwitch                     from '@/components/form/switch/switch.component.vue';
import gcDatePicker                 from '@/components/date-picker/date-picker.component.vue';

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
      rules,
      refForm,
    } = useRulesEmployeeModal();

    const {
      profileModal,
      updateProfile,
      editProfileModal,
      closeEditProfileModal,
    } = useEmployeeDetailProfile();

    const {
      projects,
      levelList,
      languages,
      professions,
      itTechnologies,
    } = useGlobals();

    return {
      rules,
      refForm,
      projects,
      levelList,
      languages,
      professions,
      itTechnologies,
      profileModal,
      updateProfile,
      editProfileModal,
      closeEditProfileModal,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-edit-employee-modal {
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
          display: flex;
          justify-content: space-between;
          margin-right: 0;

          .gc-edit-employee-modal__form__item {
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