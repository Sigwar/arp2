<template>
  <div class="gc-employee-detail">

    <gc-tool-bar @add-new-education="openNewEducationModal"
                 @change-edit-profile-modal="openEditProfileModal"
                 @add-new-certificate="openNewCertificateModal"
                 @open-pdf-modal="openPdfModal"
                 @import-project="openImportModal"></gc-tool-bar>

    <div id="profile">
      <div class="gc-employee-detail__base-info">
        <div v-show="!pdfSettings.blind"
             class="gc-employee-detail__base-info__picture">

          <img v-if="profile.picture"
               :alt="profile.lastName"
               :class="{'active': profile.isActive}"
               :src="profile.picture.url"
               class="avatar" />

          <img v-else
               :alt="profile.lastName"
               :class="{'active': profile.isActive}"
               class="avatar icon"
               src="@/assets/icons/user/user-fill.svg" />
        </div>

        <div class="gc-employee-detail__base-info__credentials">

          <p v-show="!pdfSettings.blind"
             class="name">
            {{ profile.name }} {{ profile.lastName }}
          </p>

          <p class="profession-and-level">
            {{ profile.level }} {{ profile.profession }}
          </p>
        </div>
      </div>

      <gc-employee-detail-profile />

      <gc-employee-detail-projects />

      <gc-employee-detail-certificate v-show="pdfSettings.showCertificate" />

      <gc-employee-detail-education v-show="pdfSettings.showEducation" />
    </div>

    <gc-delete-modal />

    <gc-pdf-modal />

    <gc-edit-education-modal />

    <gc-edit-project-modal />

    <gc-edit-profile-modal />

    <gc-import-projects-modal />

    <gc-edit-certificate-modal />

  </div>
</template>

<script>
import { defineComponent }              from '@vue/composition-api';
import { useGlobals }                   from '../../hooks/use-globals';
import { usePdfGenerator }              from './hooks/use-pdf-generator';
import { useEmployeeDetail }            from './hooks/use-employee-detail';
import { useEmployeeDetailProfile }     from './hooks/use-employee-detail-profile';
import { useEmployeeDetailEducation }   from './hooks/use-employee-detail-education';
import { useEmployeeDetailProjects }    from './hooks/use-employee-detail-projects';
import { useEmployeeDetailCertificate } from './hooks/use-employee-detail-certificate';
import gcPdfModal                       from './components/pdf-modal.component';
import gcDeleteModal                    from './components/delete-modal.component.vue';
import gcToolBar                        from '@/components/tool-bar/tool-bar.component.vue';
import gcEditProjectModal               from './components/project/edit-project-modal.component.vue';
import gcEditProfileModal               from './components/profile/edit-employee-modal.component.vue';
import gcImportProjectsModal            from './components/project/import-projects-modal.component.vue';
import gcEditCertificateModal           from './components/certificate/edit-certificate-modal.component';
import gcEditEducationModal             from './components/education/edit-education-modal.component.vue';
import gcEmployeeDetailProfile          from './components/profile/employee-detail-profile.component.vue';
import gcEmployeeDetailProjects         from './components/project/employee-detail-project.component.vue';
import gcEmployeeDetailEducation        from './components/education/employee-detail-education.component.vue';
import gcEmployeeDetailCertificate      from './components/certificate/employee-detail-certificate.component';

export default defineComponent({
  name: 'gcEmployeeDetail',
  components: {
    gcToolBar,
    gcPdfModal,
    gcDeleteModal,
    gcEditProjectModal,
    gcEditProfileModal,
    gcEditEducationModal,
    gcImportProjectsModal,
    gcEditCertificateModal,
    gcEmployeeDetailProfile,
    gcEmployeeDetailProjects,
    gcEmployeeDetailEducation,
    gcEmployeeDetailCertificate,
  },

  setup(props, { root }) {

    const employeeUuid = root.$route.params.uuid;

    const {
      pdfSettings,
      openPdfModal,
    } = usePdfGenerator();

    const {
      getEducation,
    } = useEmployeeDetailEducation();

    const {
      getEmployeesProfile,
      getAllProjectsToImport,
    } = useEmployeeDetail();

    const {
      openImportModal,
      getEmployeeProjects,
    } = useEmployeeDetailProjects();

    const {
      openNewEducationModal,
    } = useEmployeeDetailEducation();

    const {
      profile,
      openEditProfileModal,
    } = useEmployeeDetailProfile();

    const {
      getCertificate,
      openNewCertificateModal,
    } = useEmployeeDetailCertificate();

    const {
      getProjects,
      getLanguages,
      getLevelList,
      getWorkstation,
      getItTechnologies,
    } = useGlobals();

    // GET DATA FROM API
    getProjects();
    getLanguages();
    getLevelList();
    getWorkstation();
    getItTechnologies();
    getEducation(employeeUuid);
    getEmployeesProfile(employeeUuid);
    getEmployeeProjects(employeeUuid);
    getCertificate(employeeUuid);
    getAllProjectsToImport(employeeUuid);

    return {
      profile,
      pdfSettings,
      openPdfModal,
      openImportModal,
      openEditProfileModal,
      openNewEducationModal,
      openNewCertificateModal,
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

        &.icon {
          filter: grayscale(0) brightness(1);
        }
      }

      .icon {
        filter: grayscale(1) brightness(.5);
        padding: 1.5rem;
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