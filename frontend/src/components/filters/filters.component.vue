<template>
  <div class="gc-filters">
    <div v-if="showSearch"
         class="gc-filters__input">

      <gc-input v-model="valueInput"
                placeholder="Search..."
                @input="changeValueInput"></gc-input>
    </div>

    <div v-if="showCheckboxes"
         class="gc-filters__checkboxes">

      <gc-checkbox v-model="checkboxes.active"
                   class="gc-filters__checkboxes__item">

        Show active
      </gc-checkbox>

      <gc-checkbox v-model="checkboxes.inactive"
                   class="gc-filters__checkboxes__item">

        Show inactive
      </gc-checkbox>
    </div>

    <div v-if="showButton"
         class="gc-filters__button">

      <gc-button type="default"
                 @click="changeValueModal">{{ buttonLabel }}
      </gc-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useFilters }      from './hooks/use-filters';
import gcInput             from '@/components/form/input/input.component.vue';
import gcButton            from '@/components/form/button/button.component.vue';
import gcCheckbox          from '@/components/form/checkbox/checkbox.component.vue';

export default defineComponent({
  name: 'gcFilters',
  props: {
    showSearch: Boolean,
    showCheckboxes: Boolean,
    showButton: Boolean,
    buttonLabel: String,
  },
  components: {
    gcInput,
    gcButton,
    gcCheckbox,
  },
  setup(props, context) {

    const {
      checkboxes,
      valueInput,
      isOpenModal,
      changeValueModal,
      changeValueInput,
      checkValueOfCheckboxes,
    } = useFilters(context);

    return {
      valueInput,
      checkboxes,
      isOpenModal,
      changeValueModal,
      changeValueInput,
      checkValueOfCheckboxes,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-filters {
  margin-top: 5.3rem;
  display: flex;
  align-items: center;

  &__input {
    width: 38.7rem;
  }

  &__checkboxes {
    display: flex;

    &__item {
      margin-left: 2.3rem;

      &:before {
        content: '|';
        margin-right: 2.3rem;
      }

    }
  }

  &__button {
    margin: 0 0 0 auto;
    display: block;
  }
}
</style>