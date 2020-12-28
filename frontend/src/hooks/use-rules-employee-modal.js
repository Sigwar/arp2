import { computed, ref } from '@vue/composition-api';

export const useRulesEmployeeModal = () => {

  const refForm = ref({});

  const rules = computed(() => ({
    name: [
      { required: true, message: 'Name is required', trigger: [ 'blur', 'change' ] },
      { min: 3, message: 'Name must have min. 3 chars', trigger: [ 'blur', 'change' ] },
    ],
    lastName: [
      { required: true, message: 'Last name is required', trigger: [ 'blur', 'change' ] },
      { min: 3, message: 'Last name must have min. 3 chars', trigger: [ 'blur', 'change' ] },
    ],
    profession: [
      { required: true, message: 'Profession is required', trigger: [ 'blur', 'change' ] },
    ],
    level: [
      { required: true, message: 'Level is required', trigger: [ 'blur', 'change' ] },
    ],
    itExperience: [
      { required: true, message: 'Choose date', trigger: [ 'blur', 'change' ] },
    ],
  }));

  return {
    rules,
    refForm,
  };
};