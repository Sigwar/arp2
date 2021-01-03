<template>
  <gc-dialog :before-close="closePdfModal"
             :visible.sync="pdfModal"
             center
             class="pdf-modal"
             width="50rem">

    <h2 class="pdf-modal__title">PDF settings</h2>

    <div class="pdf-modal__settings">

      <div class="pdf-modal__settings__wrapper">
        <span class="pdf-modal__settings__title">Blind PDF:</span>
        <gc-switch v-model="pdfSettings.blind" />
      </div>

      <div class="pdf-modal__settings__wrapper">
        <span class="pdf-modal__settings__title">Show description of project:</span>
        <gc-switch v-model="pdfSettings.showDescriptionProject" />
      </div>

      <div class="pdf-modal__settings__wrapper">
        <span class="pdf-modal__settings__title">Show topic of project:</span>
        <gc-switch v-model="pdfSettings.showTopicProject" />
      </div>

      <div class="pdf-modal__settings__wrapper">
        <span class="pdf-modal__settings__title">Show education section:</span>
        <gc-switch v-model="pdfSettings.showEducation" />
      </div>

      <div class="pdf-modal__settings__wrapper">
        <span class="pdf-modal__settings__title">Show description of education:</span>
        <gc-switch v-model="pdfSettings.shoeEducationDescription" />
      </div>

      <div class="pdf-modal__settings__wrapper">
        <span class="pdf-modal__settings__title">Show certificate section:</span>
        <gc-switch v-model="pdfSettings.showCertificate" />
      </div>

    </div>
    <div class="pdf-modal__buttons">

      <gc-button class="button"
                 type="info"
                 @click.native.prevent="closePdfModal">Cancel
      </gc-button>

      <gc-button :loading="pdfModalLoading"
                 class="button"
                 type="default"
                 @click.native.prevent="generateCv">Generate CV
      </gc-button>
    </div>
  </gc-dialog>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { usePdfGenerator } from '../hooks/use-pdf-generator';
import gcSwitch            from '@/components/form/switch/switch.component.vue';
import gcButton            from '@/components/form/button/button.component.vue';
import gcDialog            from '@/components/dialog/dialog.component.vue';

export default defineComponent({
  name: 'gcPdfModal',
  components: {
    gcSwitch,
    gcButton,
    gcDialog,
  },

  setup() {

    const {
      pdfModal,
      generateCv,
      pdfSettings,
      closePdfModal,
      pdfModalLoading,
    } = usePdfGenerator();

    return {
      pdfModal,
      generateCv,
      pdfSettings,
      closePdfModal,
      pdfModalLoading,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.pdf-modal {
  padding: 2rem;

  &__title {
    color: var(--font-color);
    text-align: center;
    font-size: 2.9rem;
    margin-top: 0;
  }

  &__content {
    text-align: center;
    font-size: 4.1rem;
    color: var(--gray-dark);
    margin: 2.1rem;
    letter-spacing: 2px;
    word-break: break-word;

    &__insertion {
      font-size: 2.7rem;
      color: var(--gray-light);
      letter-spacing: normal;
    }
  }

  &__settings {
    &__wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
    }

    &__title {
      font-size: 2rem;
      width: 30rem;
      margin-right: 2rem;
      text-align: right;
    }
  }

  &__buttons {
    margin-top: 3.1rem;
    padding: 0 3.1rem;
    display: flex;
    justify-content: space-between;
    align-self: center;
  }
}
</style>