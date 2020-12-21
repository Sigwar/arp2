<template>
  <div class="gc-it-workstation">
    <span class="gc-it-workstation__title">Workstation: </span>

    <div class="gc-it-workstation__wrapper">

      <gc-input v-model="newWorkstation"
                class="gc-it-workstation__wrapper__input"
                @keydown.enter.native.prevent="addWorkstation"></gc-input>

      <gc-tag v-for="item of workstationDetail"
              :key="item.uuid"
              :disabled-transition="false"
              closable
              @close="removeWorkstation(item.uuid)">{{ item.name }}
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

    const { workstationDetail } = useGlobals();

    const {
      newWorkstation,
      addWorkstation,
      removeWorkstation,
    } = useSettings();

    return {
      newWorkstation,
      addWorkstation,
      workstationDetail,
      removeWorkstation,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-it-workstation {
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