<template>
  <div class="gc-it-levels">
    <span class="gc-it-levels__title">Levels: </span>

    <div class="gc-it-levels__wrapper">

      <gc-input v-model="newLevel"
                class="gc-it-levels__wrapper__input"
                @keydown.enter.native.prevent="addLevel"></gc-input>

      <gc-tag v-for="item of levelDetailList"
              :key="item.uuid"
              :disabled-transition="false"
              closable
              @close="removeLevel(item.uuid)">{{ item.name }}
      </gc-tag>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useSettings }     from '../hooks/use-settings';
import { useGlobals }      from '../../../hooks/use-globals';
import gcTag               from '@/components/tag/tag.component.vue';
import gcInput             from '@/components/form/input/input.component.vue';

export default defineComponent({
  name: 'gcItTechnologies',
  components: {
    gcTag,
    gcInput,
  },
  setup() {

    const { levelDetailList } = useGlobals();

    const {
      newLevel,
      addLevel,
      removeLevel,
    } = useSettings();

    return {
      addLevel,
      newLevel,
      removeLevel,
      levelDetailList,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-it-levels {
  padding-bottom: 1rem;
  margin-bottom: 3rem;
  border-bottom: 1px dashed var(--gray-light);

  &__title {
    font-size: 2rem;
  }

  &__wrapper {
    margin: 2rem 0;
    display: flex;
    align-items: center;

    &__input {
      max-width: 25rem;
      margin-right: 4rem;
    }
  }
}
</style>