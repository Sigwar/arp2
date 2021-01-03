<template>
  <gc-dialog :before-close="closeEditCertificateModal"
             :visible.sync="editCertificatesModal.visibility"
             center
             class="gc-edit-certificate-modal"
             width="40%">

    <h2 v-if="!editCertificatesModal.isNew"
        class="gc-edit-certificate-modal__title">Update certificate</h2>

    <h2 v-else
        class="gc-edit-certificate-modal__title">Create new certificate</h2>

    <gc-form :form-ref.sync="refFormCertificate"
             :model="editCertificatesModal.data"
             :rules="rulesCertificate"
             class="gc-edit-certificate-modal__form">

      <gc-form-item class="gc-edit-certificate-modal__form__item"
                    label="Certificate"
                    prop="name">

        <gc-input v-model="editCertificatesModal.data.name"
                  class="gc-edit-certificate-modal__form__item__value"
                  placeholder="Certificate"></gc-input>

      </gc-form-item>

      <gc-form-item class="gc-edit-certificate-modal__form__item gc-edit-certificate-modal__form__item--date-picker"
                    label="Date"
                    prop="date">

        <gc-date-picker v-model="editCertificatesModal.data.date"
                        class="gc-edit-certificate-modal__form__item__value"
                        placeholder="Date..."
                        type="year"></gc-date-picker>

      </gc-form-item>

      <gc-form-item class="gc-edit-certificate-modal__form__item"
                    label="Credential id"
                    prop="credentialId">

        <gc-input v-model="editCertificatesModal.data.credentialId"
                  class="gc-edit-certificate-modal__form__item__value"
                  placeholder="Credential id"></gc-input>

      </gc-form-item>

      <div class="gc-edit-certificate-modal__buttons">

        <gc-button class="button"
                   type="info"
                   @click.native.prevent="closeEditCertificateModal">Cancel
        </gc-button>

        <gc-button v-if="!editCertificatesModal.isNew"
                   class="button"
                   @click.native.prevent="updateCertificate(refFormCertificate, employeeUuid)">Update
        </gc-button>
        <gc-button v-else
                   class="button"
                   @click.native.prevent="createCertificate(refFormCertificate, employeeUuid)">Create
        </gc-button>
      </div>
    </gc-form>
  </gc-dialog>
</template>

<script>
import { defineComponent }              from '@vue/composition-api';
import { useEmployeeDetailCertificate } from '../../hooks/use-employee-detail-certificate';
import { useRulesEmployeeDetail }       from '../../rules/use-rules-employee-detail';
import gcButton                         from '@/components/form/button/button.component.vue';
import gcDialog                         from '@/components/dialog/dialog.component.vue';
import gcInput                          from '@/components/form/input/input.component.vue';
import gcForm                           from '@/components/form/form/form.component.vue';
import gcFormItem                       from '@/components/form/form-item/form-item.component.vue';
import gcDatePicker                     from '@/components/date-picker/date-picker.component.vue';

export default defineComponent({
  name: 'gceditCertificateModal',
  components: {
    gcForm,
    gcInput,
    gcButton,
    gcDialog,
    gcFormItem,
    gcDatePicker,
  },
  setup(props, { root }) {
    const employeeUuid = root.$route.params.uuid;

    const {
      rulesCertificate,
      refFormCertificate,
    } = useRulesEmployeeDetail();

    const {
      createCertificate,
      updateCertificate,
      editCertificatesModal,
      closeEditCertificateModal,
    } = useEmployeeDetailCertificate();

    return {
      employeeUuid,
      rulesCertificate,
      createCertificate,
      updateCertificate,
      refFormCertificate,
      editCertificatesModal,
      closeEditCertificateModal,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-edit-certificate-modal {
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

      :first-child {
        margin-right: 5rem;
      }
    }

    &__item {
      width: 100%;

      &__value {
        width: 100%;
      }

      &--date-picker {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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