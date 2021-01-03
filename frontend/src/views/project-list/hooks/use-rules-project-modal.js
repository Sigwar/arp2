import { computed, ref } from '@vue/composition-api';

export const useRulesProjectModal = () => {

  const refForm = ref({});

  const rules = computed(() => ({
    name: [
      { required: true, message: 'Name is required', trigger: [ 'blur', 'change' ] },
      { min: 3, message: 'Name must have min. 3 chars', trigger: [ 'blur', 'change' ] },
    ],
    description: [
      { max: 254, message: 'Up to 254 characters', trigger: [ 'blur', 'change' ] },
    ],
    client: [
      { required: true, message: 'Client is required', trigger: [ 'blur', 'change' ] },
      { min: 3, message: 'Client must have min. 3 chars', trigger: [ 'blur', 'change' ] },
    ],
    date: [
      { required: true, message: 'Please choose date', trigger: [ 'blur', 'change' ] },
    ],
  }));

  return {
    rules,
    refForm,
  };
};