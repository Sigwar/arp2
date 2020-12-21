<template>
  <div class="gc-it-technologies">
    <span class="gc-it-technologies__title">It technologies: </span>

    <div class="gc-it-technologies__wrapper">

      <gc-input v-model="newItTechnologies"
                class="gc-it-technologies__wrapper__input"
                @keydown.enter.native.prevent="addItTechnologies"></gc-input>

      <gc-tag v-for="item of itTechnologies"
              :key="item"
              :disabled-transition="false"
              closable
              @close="removeItTechnologies(item)">{{ item }}
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

    const { itTechnologies } = useGlobals();

    const {
      newItTechnologies,
      addItTechnologies,
      removeItTechnologies,
    } = useSettings();

    return {
      itTechnologies,
      newItTechnologies,
      addItTechnologies,
      removeItTechnologies,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-it-technologies {
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