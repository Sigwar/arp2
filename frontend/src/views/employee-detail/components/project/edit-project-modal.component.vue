<template>
  <gc-dialog :before-close="closeEditProjectModal"
             :visible.sync="editProject.visibility"
             center
             class="gc-edit-project-modal"
             width="40%">

    <h2 class="gc-edit-project-modal__title">Update project</h2>

    <gc-form ref="gcEditProject"
             :modal="editProject.data"
             class="gc-edit-project-modal__form">

      <div class="gc-edit-project-modal__form__wrapper">
        <gc-form-item class="gc-edit-project-modal__form__item"
                      label="Project name:"
                      prop="projectName">

          <gc-input v-model="editProject.data.name"
                    :disabled="true"
                    class="gc-edit-project-modal__form__item__value"
                    placeholder="School name"></gc-input>

        </gc-form-item>

        <gc-form-item class="gc-edit-project-modal__form__item"
                      label="Client:"
                      prop="clientName">

          <gc-input v-model="editProject.data.client"
                    :disabled="true"
                    class="gc-edit-project-modal__form__item__value"
                    placeholder="School name"></gc-input>

        </gc-form-item>
      </div>

      <div class="gc-edit-project-modal__form__wrapper">

        <gc-form-item class="gc-edit-project-modal__form__item"
                      label="Topic:"
                      prop="client">

          <gc-input v-model="editProject.data.topic"
                    :disabled="true"
                    class="gc-edit-project-modal__form__item__value"
                    placeholder="Topic"></gc-input>

        </gc-form-item>

        <gc-form-item class="gc-edit-project-modal__form__item"
                      label="Time frame:"
                      prop="client">

          <gc-date-picker v-model="editProject.data.date"
                          class="gc-edit-project-modal__form__item__value gc-edit-project-modal__form__item__value--monthrange"
                          end-placeholder="End month"
                          range-separator="-"
                          start-placeholder="Start month"
                          type="monthrange"></gc-date-picker>
        </gc-form-item>

      </div>

      <gc-form-item class="gc-edit-project-modal__form__item"
                    label="Roles:"
                    prop="role">

        <div class="gc-edit-project-modal__form__item--wrapper">

          <gc-tag v-for="tag in editProject.data.roles"
                  :key="tag"
                  :disabled-transition="false"
                  closable
                  @close="removeRole(tag)">{{ tag }}
          </gc-tag>

          <gc-input v-model="newRole"
                    class="gc-edit-project-modal__form__item__value gc-edit-project-modal__form__item__value--tag"
                    @keydown.enter.native.prevent="addNewRoles"></gc-input>
        </div>

      </gc-form-item>

      <gc-form-item class="gc-edit-project-modal__form__item"
                    label="Technologies:"
                    prop="technologies">

        <gc-select v-model="editProject.data.technologies"
                   allow-create
                   filterable
                   multiple>

          <gc-option v-for="technology in itTechnologies"
                     :key="technology"
                     :labe="technology"
                     :value="technology">{{ technology }}
          </gc-option>
        </gc-select>
      </gc-form-item>

      <gc-form-item class="gc-edit-project-modal__form__item"
                    label="Activities:"
                    prop="role">

        <div class="gc-edit-project-modal__form__item--wrapper">

          <gc-tag v-for="tag in editProject.data.activities"
                  :key="tag"
                  :disabled-transition="false"
                  closable
                  @close="removeActivities(tag)">{{ tag }}
          </gc-tag>

          <gc-input v-model="newActivities"
                    class="gc-edit-project-modal__form__item__value gc-edit-project-modal__form__item__value--tag"
                    @keydown.enter.native.prevent="addNewActivities"></gc-input>
        </div>
      </gc-form-item>

      <gc-form-item class="gc-edit-project-modal__form__item"
                    label="Description:"
                    prop="client">

        <gc-input v-model="editProject.data.description"
                  :autosize="{minRows: 3}"
                  :disabled="true"
                  class="gc-edit-project-modal__form__item__value"
                  placeholder="Description"
                  type="textarea"></gc-input>

      </gc-form-item>

      <div class="gc-edit-project-modal__buttons">
        <gc-button class="button"
                   type="info"
                   @click.native.prevent="closeEditProjectModal">Cancel
        </gc-button>

        <gc-button class="button"
                   @click.native.prevent="updateProject">Update
        </gc-button>
      </div>

    </gc-form>
  </gc-dialog>
</template>

<script>
import { defineComponent }           from '@vue/composition-api';
import { useEmployeeDetailProfile }  from '../../hooks/use-employee-detail-profile';
import { useEmployeeDetailProjects } from '../../hooks/use-employee-detail-projects';
import { useGlobals }                from '../../../../hooks/use-globals';
import gcButton                      from '@/components/form/button/button.component.vue';
import gcDialog                      from '@/components/dialog/dialog.component.vue';
import gcInput                       from '@/components/form/input/input.component.vue';
import gcForm                        from '@/components/form/form/form.component.vue';
import gcFormItem                    from '@/components/form/form-item/form-item.component.vue';
import gcDatePicker                  from '@/components/date-picker/date-picker.component.vue';
import gcSelect                      from '@/components/form/select/select.component.vue';
import gcOption                      from '@/components/form/select/option.component.vue';
import gcTag                         from '@/components/tag/tag.component.vue';

export default defineComponent({
  name: 'gcEditProjectModal',
  components: {
    gcTag,
    gcForm,
    gcInput,
    gcButton,
    gcDialog,
    gcSelect,
    gcOption,
    gcFormItem,
    gcDatePicker,
  },
  setup() {
    const {
      knowledgeTags,
    } = useEmployeeDetailProfile();

    const {
      newRole,
      removeRole,
      addNewRoles,
      editProject,
      updateProject,
      newActivities,
      removeActivities,
      addNewActivities,
      closeEditProjectModal,
    } = useEmployeeDetailProjects();

    const { itTechnologies } = useGlobals();

    return {
      newRole,
      removeRole,
      editProject,
      addNewRoles,
      knowledgeTags,
      updateProject,
      newActivities,
      itTechnologies,
      removeActivities,
      addNewActivities,
      closeEditProjectModal,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-edit-project-modal {
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
    }

    &__item {
      width: 100%;

      &:first-child {
        margin-right: 3rem;
      }

      &__value {
        width: 100%;

        &--monthrange {
          min-width: 100%;
        }

        &--tag {
          width: 140px;

          /deep/ {
            .el-input__inner {
              margin-top: 1px;
              height: 32px;
            }
          }
        }
      }

      &--small {
        margin-left: 3rem;
        width: 17rem;
      }

      &--wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
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