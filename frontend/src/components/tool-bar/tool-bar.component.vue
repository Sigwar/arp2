<template>
  <div class="gc-tool-bar">
    <div class="gc-tool-bar__icon icon-settings"></div>

    <div class="gc-tool-bar__container">
      <gc-tooltip content="Generate CV"
                  effect="dark"
                  placement="left-start">

        <div class="gc-tool-bar__container__icon icon-doc--yellow"
             @click="openPdfModal"></div>

      </gc-tooltip>

      <gc-tooltip content="Edit profile"
                  effect="dark"
                  placement="left-start">

        <div class="gc-tool-bar__container__icon icon-user--yellow"
             @click="changeEditProfileModal"></div>

      </gc-tooltip>

      <gc-tooltip content="Import project"
                  effect="dark"
                  placement="left-start">

        <div class="gc-tool-bar__container__icon icon-project--yellow"
             @click="importProject"></div>

      </gc-tooltip>

      <gc-tooltip content="Add certificate"
                  effect="dark"
                  placement="left-start">

        <div class="gc-tool-bar__container__icon gc-tool-bar__container__icon--small icon-certificate--yellow"
             @click="addNewCertificate"></div>

      </gc-tooltip>

      <gc-tooltip content="Add education"
                  effect="dark"
                  placement="left-start">

        <div class="gc-tool-bar__container__icon icon-education--yellow"
             @click="addNewEducation"></div>

      </gc-tooltip>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useToolbar }      from './hooks/use-tool-bar';
import gcTooltip           from '@/components/tooltip/tooltip.component.vue';

export default defineComponent({
  name: 'gcToolBar',
  components: {
    gcTooltip,
  },

  setup(props, context) {

    const {
      openPdfModal,
      importProject,
      addNewEducation,
      addNewCertificate,
      changeEditProfileModal,
    } = useToolbar(context);

    return {
      openPdfModal,
      importProject,
      addNewEducation,
      addNewCertificate,
      changeEditProfileModal,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-tool-bar {
  z-index: 1;
  right: 11rem;
  top: calc(50vh - 13.5rem);
  width: 5rem;
  height: 5rem;
  display: flex;
  padding: .3rem;
  position: fixed;
  border-radius: 2px;
  align-items: center;
  flex-direction: column;
  background: var(--white);
  transition: var(--cubic-bezier);
  border: 1px solid var(--gray-light);
  background: var(--white);

  &:hover {
    border: 1px solid var(--warning);
    box-shadow: var(--input-shadow);
    height: 33rem;
    transition: var(--cubic-bezier);

    .gc-tool-bar__icon {
      width: 0;
      transition: var(--transition);
    }

    .gc-tool-bar__container__icon {
      height: 4.1rem;
      transition: var(--box-sort);
      margin: 2rem;
    }
  }

  &__icon {
    opacity: .5;
    width: 2.7rem;
    height: 4.1rem;
    transition: var(--transition);
  }

  &__container {
    &__icon {
      height: 0;
      width: 3rem;
      transition: var(--box-sort);
      filter: grayscale(100%);

      &:hover {
        cursor: pointer;
        filter: grayscale(0%)
      }
    }
  }
}

</style>