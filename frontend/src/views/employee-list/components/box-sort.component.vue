<template>
  <div class="gc-box-sort">

    <div v-if="name === sort.sortBy"
         :class="{'gc-box-sort__icon--upside-down': sort.direction === 'DESC'}"
         class="gc-box-sort__icon icon-next"></div>

    <div v-else
         class="gc-box-sort__icon icon-minus"></div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useEmployeeList } from '../hooks/use-employee-list';

export default defineComponent({
  name: 'gcBoxSort',
  props: {
    name: String,
  },
  setup() {
    const {
      sort,
    } = useEmployeeList();

    return {
      sort,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-box-sort {
  margin-left: 1rem;
  background: var(--primary-color);
  padding: .41rem;
  border-radius: 2px;

  &__icon {
    height: 1.3rem;
    width: 1.3rem;
    transition: var(--box-sort);

    &--upside-down {
      transform: rotateX(180deg);
    }
  }
}
</style>