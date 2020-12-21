<template>
  <gc-dialog :before-close="closeImportModal"
             :visible.sync="projectsToImport.visibility"
             center
             class="gc-import-projects-modal"
             width="25%">

    <h2 class="gc-import-projects-modal__title">Import projects</h2>

    <div class="gc-import-projects-modal__container">

      <template v-if="projectsToImport.projects.length">
        <gc-checkbox-group v-model="selectedProjectsToImport"
                           class="gc-import-projects-modal__container__checkboxes">

          <gc-checkbox v-for="project in projectsToImport.projects"
                       :key="project.uuid"
                       :label="project.uuid"
                       :value="project.uuid"
                       class="gc-import-projects-modal__container__checkboxes__item">

            <p class="gc-import-projects-modal__container__checkboxes__item__label">
              {{ project.name }} <span class="small">for</span> {{ project.client }}
            </p>
          </gc-checkbox>

        </gc-checkbox-group>
      </template>

      <template v-else>
        <span class="gc-import-projects-modal__container__empty">No projects to import!</span>
      </template>
    </div>

    <div class="gc-import-projects-modal__buttons">

      <gc-button class="button"
                 type="info"
                 @click.native.prevent="closeImportModal">Cancel
      </gc-button>

      <gc-button :disabled="projectsToImport.projects.length === 0"
                 class="button"
                 type="default"
                 @click.native.prevent="importProjects(employeeUuid)">Import
      </gc-button>
    </div>
  </gc-dialog>
</template>

<script>
import { defineComponent }           from '@vue/composition-api';
import { useEmployeeDetailProjects } from '../../hooks/use-employee-detail-projects';
import gcDialog                      from '@/components/dialog/dialog.component.vue';
import gcButton                      from '@/components/form/button/button.component.vue';
import gcCheckbox                    from '@/components/form/checkbox/checkbox.component.vue';
import gcCheckboxGroup               from '@/components/form/checkbox/checkbox-group.component.vue';

export default defineComponent({
  name: 'importProjectsModal',
  components: {
    gcDialog,
    gcButton,
    gcCheckbox,
    gcCheckboxGroup,
  },
  setup(props, { root }) {
    const employeeUuid = root.$route.params.uuid;

    const {
      importProjects,
      closeImportModal,
      projectsToImport,
      selectedProjectsToImport,
    } = useEmployeeDetailProjects();

    return {
      employeeUuid,
      importProjects,
      closeImportModal,
      projectsToImport,
      selectedProjectsToImport,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-import-projects-modal {
  padding: 2rem;

  &__title {
    color: var(--font-color);
    text-align: center;
    font-size: 2.9rem;
    margin-top: 0;
  }

  &__container {
    &__checkboxes {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &__item {
        width: 100%;

        &__label {
          font-size: 2.2rem;
          color: var(--black);
          margin: 1.6rem 0;

          .small {
            font-size: 1.8rem;
            color: var(--gray-light)
          }
        }

        &:hover {
          background: var(--background-color);
        }
      }
    }

    &__empty {
      display: block;
      font-size: 2rem;
      text-align: center;
      padding: 1.1rem;
      background: var(--warning-20);
      border: 1px solid var(--warning);
    }
  }

  &__buttons {
    margin-top: 3.1rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>