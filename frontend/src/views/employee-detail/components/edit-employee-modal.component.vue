<template>
  <gc-dialog :before-close="closeEditProfileModal"
             :visible.sync="editProfileModal"
             center
             class="gc-edit-employee-modal"
             width="45%">

    <h2 class="gc-edit-employee-modal__title">Update employee</h2>

    <gc-form :modal="profileModal"
             class="gc-edit-employee-modal__form"
             ref="gcNewProjectModal">

      <div class="gc-edit-employee-modal__form__row">

        <div @click="$refs.pictureUpload.click()"
             class="gc-edit-employee-modal__form__row__avatar-uploader">

          <input @change="handleAvatarSuccess"
                 class="avatar-input"
                 ref="pictureUpload"
                 type="file" />

          <img :alt="profileModal.name"
               :src="profileModal.picture.url"
               class="picture"
               v-if="profileModal.picture" />

          <i class="el-icon-plus avatar-uploader-icon"
             v-else></i>
        </div>

        <div class="gc-edit-employee-modal__form__row__wrapper gc-edit-employee-modal__form__row__wrapper--no-margin">
          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="Name"
                        prop="name">

            <gc-input class="gc-edit-employee-modal__form__item__value"
                      v-model="profileModal.name"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="Last name:"
                        prop="latName">

            <gc-input class="gc-edit-employee-modal__form__item__value"
                      v-model="profileModal.lastName"></gc-input>
          </gc-form-item>
        </div>
      </div>

      <div class="gc-edit-employee-modal__form__row">

        <div class="gc-edit-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="Profession"
                        prop="profession">

            <gc-input class="gc-edit-employee-modal__form__item__value"
                      v-model="profileModal.profession"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-edit-employee-modal__form__item gc-edit-employee-modal__form__item"
                        label="Level"
                        prop="level">

            <gc-select allow-create
                       default-first-option
                       filterable
                       placeholder="Select level..."
                       v-model="profileModal.level">

              <gc-option :key="profession"
                         :label="profession"
                         :value="profession"
                         v-for="profession in professionList"></gc-option>
            </gc-select>
          </gc-form-item>
        </div>

        <div class="gc-edit-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="Birthday"
                        prop="birthDay">

            <gc-input class="gc-edit-employee-modal__form__item__value"
                      v-model="profileModal.birthDay"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="IT Experience:"
                        prop="itExperience">

            <gc-input class="gc-edit-employee-modal__form__item__value"
                      v-model="profileModal.itExperience"></gc-input>
          </gc-form-item>
        </div>

        <div class="gc-edit-employee-modal__form__row__wrapper">
          <gc-form-item class="gc-edit-employee-modal__form__item"
                        label="Language"
                        prop="language">

            <gc-input class="gc-edit-employee-modal__form__item__value"
                      v-model="profileModal.language"></gc-input>
          </gc-form-item>

          <gc-form-item class="gc-edit-employee-modal__form__item gc-edit-employee-modal__form__item--switch"
                        label="Active"
                        prop="active">

            <gc-switch class="gc-edit-employee-modal__form__item__value"
                       v-model="profileModal.isActive"></gc-switch>
          </gc-form-item>
        </div>
      </div>

      <gc-form-item class="gc-edit-employee-modal__form__item"
                    label="IT knowledge:"
                    prop="itKnowledge">

        <gc-select allow-create
                   default-first-option
                   filterable
                   multiple
                   placeholder="Select knowledge..."
                   v-model="profileModal.itKnowledge">

          <gc-option :key="tag"
                     :label="tag"
                     :value="tag"
                     v-for="tag in knowledgeTags"></gc-option>
        </gc-select>
      </gc-form-item>

      <div class="gc-edit-employee-modal__form__buttons">

        <gc-button @click.native.prevent="closeEditProfileModal"
                   class="button"
                   type="info">Cancel
        </gc-button>

        <gc-button @click.native.prevent="updateProfile"
                   class="button"
                   type="default">Update
        </gc-button>
      </div>
    </gc-form>
  </gc-dialog>
</template>

<script>
import { defineComponent }          from '@vue/composition-api';
import { useEmployeeDetailProfile } from '../hooks/use-employee-detail-profile';
import gcForm                       from '@/components/form/form/form.component.vue';
import gcInput                      from '@/components/form/input/input.component.vue';
import gcDialog                     from '@/components/dialog/dialog.component.vue';
import gcSelect                     from '@/components/form/select/select.component.vue';
import gcOption                     from '@/components/form/select/option.component.vue';
import gcButton                     from '@/components/form/button/button.component.vue';
import gcFormItem                   from '@/components/form/form-item/form-item.component.vue';
import gcUpload                     from '@/components/upload/uplaod.component.vue';
import gcSwitch                     from '@/components/form/switch/switch.component.vue';

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
      profileModal,
      updateProfile,
      professionList,
      knowledgeTags,
      editProfileModal,
      handleAvatarSuccess,
      closeEditProfileModal,
    } = useEmployeeDetailProfile();

    return {
      profileModal,
      updateProfile,
      knowledgeTags,
      professionList,
      editProfileModal,
      handleAvatarSuccess,
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