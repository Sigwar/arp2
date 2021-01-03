import { computed, ref } from '@vue/composition-api';

export const useRulesEmployeeDetail = () => {

  const refForm = ref({});

  const rulesEducation = computed(() => ({
    schoolName: [
      { required: true, message: 'School name is required', trigger: [ 'blur', 'change' ] },
      { min: 3, message: 'Name must have min. 3 chars', trigger: [ 'blur', 'change' ] },
    ],
    description: [
      { max: 254, message: 'Up to 254 characters', trigger: [ 'blur', 'change' ] },
    ],
    date: [
      { validator: checkDate, message: 'Date is required', trigger: [ 'blur', 'change' ] },
    ],
  }));

  const refFormCertificate = ref({});

  const rulesCertificate = computed(() => ({
    name: [
      { required: true, message: 'Name is required', trigger: [ 'blur', 'change' ] },
      { min: 3, message: 'Name must have min. 3 chars', trigger: [ 'blur', 'change' ] },
    ],
    credentialId: [
      { required: true, message: 'Credential ID is required', trigger: [ 'blur', 'change' ] },
    ],
    date: [
      { required: true, message: 'Date is required', trigger: [ 'blur', 'change' ] },
    ],
  }));

  const checkDate = (rule, value, callback) => {
    if (value !== null) {
      if (value[ 0 ] !== '' && value[ 1 ] !== '') {
        callback();
      } else {
        callback(new Error('Date is required'));
      }
    } else {
      callback(new Error('Date is required'));
    }
  };

  return {
    refForm,
    rulesEducation,
    rulesCertificate,
    refFormCertificate,
  };
};