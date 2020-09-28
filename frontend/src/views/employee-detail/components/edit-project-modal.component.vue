<template>
  <gc-dialog :before-close="closeEditProjectModal"
             :visible.sync="editProject.visibility"
             center
             class="gc-edit-project-modal"
             width="40%">

    <h2 class="gc-edit-project-modal__title">Update project</h2>

    <gc-form :modal="editProject.data"
             class="gc-edit-project-modal__form"
             ref="gcEditProject">

      <div class="gc-edit-project-modal__form__wrapper">
        <gc-form-item class="gc-edit-project-modal__form__item"
                      label="Project name:"
                      prop="projectName">

          <gc-input class="gc-edit-project-modal__form__item__value"
                    placeholder="School name"
                    v-model="editProject.data.projectName"></gc-input>

        </gc-form-item>

        <gc-form-item class="gc-edit-project-modal__form__item"
                      label="Client:"
                      prop="clientName">

          <gc-input class="gc-edit-project-modal__form__item__value"
                    placeholder="School name"
                    v-model="editProject.data.clientName"></gc-input>

        </gc-form-item>

        <gc-form-item class="gc-edit-project-modal__form__item gc-edit-project-modal__form__item--small"
                      label="Order:"
                      prop="order">

          <gc-input class="gc-edit-project-modal__form__item__value"
                    placeholder="Order..."
                    v-model="editProject.data.order"></gc-input>

        </gc-form-item>
      </div>

      <div class="gc-edit-project-modal__form__wrapper">

        <gc-form-item class="gc-edit-project-modal__form__item"
                      label="Topic:"
                      prop="client">

          <gc-input class="gc-edit-project-modal__form__item__value"
                    placeholder="Topic"
                    v-model="editProject.data.topic"></gc-input>

        </gc-form-item>

        <gc-form-item class="gc-edit-project-modal__form__item"
                      label="Time frame:"
                      prop="client">

          <gc-date-picker class="gc-edit-project-modal__form__item__value gc-edit-project-modal__form__item__value--monthrange"
                          end-placeholder="End month"
                          range-separator="-"
                          start-placeholder="Start month"
                          type="monthrange"
                          v-model="editProject.data.date"></gc-date-picker>
        </gc-form-item>

      </div>

      <gc-form-item class="gc-edit-project-modal__form__item"
                    label="Roles:"
                    prop="role">

        <gc-select allow-create
                   filterable
                   multiple
                   v-model="editProject.data.roles">

          <gc-option :key="role"
                     :labe="role"
                     :value="role"
                     v-for="role in editProject.data.roles">{{role}}
          </gc-option>
        </gc-select>
      </gc-form-item>

      <gc-form-item class="gc-edit-project-modal__form__item"
                    label="Technologies:"
                    prop="technologies">

        <gc-select allow-create
                   filterable
                   multiple
                   v-model="editProject.data.technologies">

          <gc-option :key="technology"
                     :labe="technology"
                     :value="technology"
                     v-for="technology in knowledgeTags">{{technology}}
          </gc-option>
        </gc-select>
      </gc-form-item>

      <gc-form-item class="gc-edit-project-modal__form__item"
                    label="Activities:"
                    prop="role">

        <gc-select allow-create
                   filterable
                   multiple
                   v-model="editProject.data.activities">

          <gc-option :key="activity"
                     :labe="activity"
                     :value="activity"
                     v-for="activity in editProject.data.activities">{{activity}}
          </gc-option>
        </gc-select>
      </gc-form-item>

      <gc-form-item class="gc-edit-project-modal__form__item"
                    label="Description:"
                    prop="client">

        <gc-input :autosize="{minRows: 3}"
                  class="gc-edit-project-modal__form__item__value"
                  placeholder="Description"
                  type="textarea"
                  v-model="editProject.data.description"></gc-input>

      </gc-form-item>

      <div class="gc-edit-project-modal__buttons">
        <gc-button @click.native.prevent="closeEditProjectModal"
                   class="button"
                   type="info">Cancel
        </gc-button>

        <gc-button @click.native.prevent="updateProject"
                   class="button">Update
        </gc-button>
      </div>

    </gc-form>
  </gc-dialog>
</template>

<script>
import { defineComponent }           from '@vue/composition-api';
import { useEmployeeDetailProfile }  from '../hooks/use-employee-detail-profile';
import { useEmployeeDetailProjects } from '../hooks/use-employee-detail-projects';
import gcButton                      from '@/components/form/button/button.component.vue';
import gcDialog                      from '@/components/dialog/dialog.component.vue';
import gcInput                       from '@/components/form/input/input.component.vue';
import gcForm                        from '@/components/form/form/form.component.vue';
import gcFormItem                    from '@/components/form/form-item/form-item.component.vue';
import gcDatePicker                  from '@/components/date-picker/date-picker.component.vue';
import gcSelect                      from '@/components/form/select/select.component.vue';
import gcOption                      from '@/components/form/select/option.component.vue';

export default defineComponent({
  name: 'gcEditProjectModal',
  components: {
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
      editProject,
      updateProject,
      closeEditProjectModal,
    } = useEmployeeDetailProjects();

    return {
      editProject,
      knowledgeTags,
      updateProject,
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
      }

      &--small {
        margin-left: 3rem;
        width: 17rem;
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