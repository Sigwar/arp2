import { ref } from '@vue/composition-api';
import store   from '@/store/store';

export const useSettings = () => {

  const newItTechnologies = ref('');

  const removeItTechnologies = (payload) => {
    store.dispatch('deleteItTechnologies', payload);
  };

  const addItTechnologies = () => {
    if (newItTechnologies.value.length) {
      store.dispatch('createNewItTechnologies', newItTechnologies.value);
      newItTechnologies.value = '';
    }
  };

  const newLanguage = ref('');

  const removeLanguage = (payload) => {
    store.dispatch('deleteLanguages', payload);
  };

  const addLanguage = () => {
    if (newLanguage.value) {
      store.dispatch('createNewLanguages', newLanguage.value);
      newLanguage.value = '';
    }
  };

  const newLevel = ref('');

  const removeLevel = (payload) => {
    store.dispatch('deleteLevel', payload);
  };

  const addLevel = () => {
    if (newLevel.value) {
      store.dispatch('createNewLevel', newLevel.value);
      newLevel.value = '';
    }
  };

  const newWorkstation = ref('');

  const removeWorkstation = (payload) => {
    store.dispatch('deleteWorkstation', payload);
  };

  const addWorkstation = () => {
    if (newWorkstation.value) {
      store.dispatch('createNewWorkstation', newWorkstation.value);
      newWorkstation.value = '';
    }
  };

  return {
    addLevel,
    newLevel,
    removeLevel,
    addLanguage,
    newLanguage,
    removeLanguage,
    newWorkstation,
    addWorkstation,
    newItTechnologies,
    addItTechnologies,
    removeWorkstation,
    removeItTechnologies,
  };
};