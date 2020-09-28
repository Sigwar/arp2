<template>
  <div class="gc-filters">
    <div class="gc-filters__input"
         v-if="showSearch">

      <gc-input @input="changeValueInput"
                placeholder="Search..."
                v-model="valueInput"></gc-input>
    </div>

    <div class="gc-filters__checkboxes"
         v-if="showCheckboxes">

      <gc-checkbox class="gc-filters__checkboxes__item"
                   v-model="checkboxes.active">

        Show active
      </gc-checkbox>

      <gc-checkbox class="gc-filters__checkboxes__item"
                   v-model="checkboxes.inactive">

        Show inactive
      </gc-checkbox>
    </div>

    <div class="gc-filters__button"
         v-if="showButton">

      <gc-button @click="changeValueModal"
                 type="default">{{ buttonLabel }}
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
    } = useFilters(context);

    return {
      valueInput,
      checkboxes,
      isOpenModal,
      changeValueModal,
      changeValueInput,
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