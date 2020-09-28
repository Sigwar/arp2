<template>
  <div class="gc-employee-detail">

    <gc-tool-bar @add-new-education="openNewEducationModal"
                 @change-edit-profile-modal="openEditProfileModal"
                 @import-project="openImportModal"></gc-tool-bar>

    <div class="gc-employee-detail__base-info">
      <div class="gc-employee-detail__base-info__picture">

        <img :alt="profile.lastName"
             :class="{'active': profile.isActive}"
             :src="profile.picture.url"
             class="avatar"
             v-if="profile.picture" />

        <div :class="{'active': profile.isActive}"
             class="avatar icon icon-avatar"
             v-else></div>
      </div>

      <div class="gc-employee-detail__base-info__credentials">
        <p class="name">
          {{ profile.name }} {{ profile.lastName }}
        </p>

        <p class="profession-and-level">
          {{ profile.level }} {{ profile.profession }}
        </p>
      </div>
    </div>

    <gc-employee-detail-profile></gc-employee-detail-profile>

    <gc-employee-detail-education></gc-employee-detail-education>

    <gc-employee-detail-projects></gc-employee-detail-projects>

    <gc-delete-modal></gc-delete-modal>

    <gc-edit-education-modal></gc-edit-education-modal>

    <gc-edit-project-modal></gc-edit-project-modal>

    <gc-edit-profile-modal></gc-edit-profile-modal>

    <gc-import-projects-modal></gc-import-projects-modal>

  </div>
</template>

<script>
import { defineComponent }            from '@vue/composition-api';
import { useEmployeeDetail }          from './hooks/use-employee-detail';
import { useEmployeeDetailProfile }   from './hooks/use-employee-detail-profile';
import { useEmployeeDetailEducation } from './hooks/use-employee-detail-education';
import { useEmployeeDetailProjects }  from './hooks/use-employee-detail-projects';
import gcToolBar                      from '@/components/tool-bar/tool-bar.component.vue';
import gcDeleteModal                  from './components/delete-modal.component.vue';
import gcEditProfileModal             from './components/edit-employee-modal.component.vue';
import gcEditProjectModal             from './components/edit-project-modal.component.vue';
import gcEditEducationModal           from './components/edit-education-modal.component.vue';
import gcEmployeeDetailProfile        from './components/employee-detail-profile.component.vue';
import gcEmployeeDetailProjects       from './components/employee-detail-project.component.vue';
import gcEmployeeDetailEducation      from './components/employee-detail-education.component.vue';
import gcImportProjectsModal          from './components/import-projects-modal.component.vue';

export default defineComponent({
  name: 'gcEmployeeDetail',
  components: {
    gcToolBar,
    gcDeleteModal,
    gcEditProjectModal,
    gcEditProfileModal,
    gcEditEducationModal,
    gcImportProjectsModal,
    gcEmployeeDetailProfile,
    gcEmployeeDetailProjects,
    gcEmployeeDetailEducation,
  },

  setup() {

    const {
      getEmployeesProfile,
    } = useEmployeeDetail();

    getEmployeesProfile();

    const {
      openImportModal,
    } = useEmployeeDetailProjects();

    const {
      openNewEducationModal,
    } = useEmployeeDetailEducation();

    const {
      profile,
      openEditProfileModal,
    } = useEmployeeDetailProfile();


    return {
      profile,
      openImportModal,
      openEditProfileModal,
      openNewEducationModal,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-employee-detail {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  position: relative;

  &__base-info {
    display: flex;
    margin: 3.7rem 0 5.1rem;

    &__picture {
      width: 17rem;
      height: 17rem;

      .avatar {
        border: 7px solid var(--black);
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      .active {
        border: 7px solid var(--primary-color);
      }

      .icon {
        width: 100%;
        height: 100%;
      }
    }

    &__credentials {
      margin-left: 3.1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .name {
        margin: 0;
        font-size: 7.9rem;
        font-weight: var(--font-light);
        letter-spacing: 3px;
      }

      .profession-and-level {
        margin: 0;
        font-size: 3.9rem;
        font-weight: var(--font-bold);
        color: var(--primary-color);
        letter-spacing: 5px;
      }
    }
  }
}
</style>