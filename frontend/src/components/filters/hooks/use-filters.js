import { reactive, ref, watch } from '@vue/composition-api';

export const useFilters = (context) => {

  const search = ref('');

  const isModalOpen = ref(false);

  const valueInput = ref('');

  const checkboxes = reactive({
    active: true,
    inactive: true,
  });
  watch(checkboxes, () => {
    if (!checkboxes.active && !checkboxes.inactive) {
      checkboxes.active = true;
      checkboxes.inactive = true;
    }

    context.emit('change-boxes', checkboxes);
  });

  const changeValueInput = (value) => {
    context.emit('change-search', value);
  };

  const changeValueModal = () => {
    context.emit('change-modal-state');
  };


  return {
    search,
    checkboxes,
    valueInput,
    isModalOpen,
    changeValueModal,
    changeValueInput,
  };
};