import { computed, reactive, ref } from '@vue/composition-api';
import router                      from '@/router';
import store                       from '@/store/store';

export const useRegistrationForm = () => {

  const refForm = ref({});

  const registrationForm = reactive({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    rules: false,
  });

  const goToLogin = () => {
    router.push({ name: 'Login' }).catch(() => {
    });
  };

  const registerAccount = (form) => {
    form.validate((valid) => {
      if (valid) {
        store.dispatch('registrationModule/registrationAccount', registrationForm);
      }
    });
  };

  const rules = computed(() => ({
    name: [
      { required: true, message: 'Name is required', trigger: [ 'blur', 'change' ] },
      { min: 3, message: 'Name must have min. 3 chars', trigger: [ 'blur', 'change' ] },
    ],
    email: [
      { required: true, message: 'E-mail name is required', trigger: [ 'blur', 'change' ] },
    ],
    password: [
      { required: true, message: 'Password is required', trigger: [ 'blur', 'change' ] },
      { min: 6, message: 'Password must have min. 6 chars', trigger: [ 'blur', 'change' ] },
    ],
    repeatPassword: [
      { required: true, message: 'Password is required', trigger: [ 'blur', 'change' ] },
      { validator: checkPassword, message: 'Password not match', trigger: [ 'blur', 'change' ] },
    ],
    rules: [
      { required: true, message: 'Rules is required', trigger: [ 'blur', 'change' ] },
    ],
  }));

  const checkPassword = (rule, value, callback) => {
    if (value !== registrationForm.password) {
      callback(new Error('Password not match'));
    } else {
      callback();
    }
  };

  return {
    rules,
    refForm,
    goToLogin,
    registerAccount,
    registrationForm,
  };
};