import { ref } from '@vue/composition-api';
import store   from '@/store/store';

export const useSettings = () => {

  const newItTechnologies = ref('');

  const removeItTechnologies = (payload) => {
    store.dispatch('deleteItTechnologies', payload);
  };

  const addItTechnologies = () => {
    store.dispatch('createNewItTechnologies', newItTechnologies.value);
    newItTechnologies.value = '';
  };

  const newLanguage = ref('');

  const removeLanguage = (payload) => {
    store.dispatch('deleteLanguages', payload);
  };

  const addLanguage = () => {
    store.dispatch('createNewLanguages', newLanguage.value);
    newLanguage.value = '';
  };

  const newLevel = ref('');

  const removeLevel = (payload) => {
    store.dispatch('deleteLevel', payload);
  };

  const addLevel = () => {
    store.dispatch('createNewLevel', newLevel.value);
    newLevel.value = '';
  };

  const newWorkstation = ref('');

  const removeWorkstation = (payload) => {
    store.dispatch('deleteWorkstation', payload);
  };

  const addWorkstation = () => {
    store.dispatch('createNewWorkstation', newWorkstation.value);
    newWorkstation.value = '';
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