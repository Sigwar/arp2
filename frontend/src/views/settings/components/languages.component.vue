<template>
  <div class="gc-it-languages">
    <span class="gc-it-languages__title">Languages: </span>

    <div class="gc-it-languages__wrapper">

      <gc-input v-model="newLanguage"
                class="gc-it-languages__wrapper__input"
                @keydown.enter.native.prevent="addLanguage"></gc-input>

      <gc-tag v-for="item of languagesWithoutLevel"
              :key="item.uuid"
              :disabled-transition="false"
              closable
              @close="removeLanguage(item.uuid)">{{ item.name }}
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

    const { languagesWithoutLevel } = useGlobals();

    const {
      newLanguage,
      addLanguage,
      removeLanguage,
    } = useSettings();

    return {
      newLanguage,
      addLanguage,
      removeLanguage,
      languagesWithoutLevel,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-it-languages {
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