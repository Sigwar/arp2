<template>
  <div class="gc-settings">
    <h1>Settings</h1>

    <gc-it-technologies />

    <gc-workstation />

    <gc-languages />

    <gc-level />

  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useGlobals }      from '../../hooks/use-globals';
import gcLevel             from './components/levels.component';
import gcItTechnologies    from './components/it-technologies.component';
import gcLanguages         from './components/languages.component';
import gcWorkstation       from './components/workstation.component';

export default defineComponent({
  name: 'gcSettings',
  components: {
    gcLevel,
    gcLanguages,
    gcWorkstation,
    gcItTechnologies,
  },

  setup() {

    const {
      itTechnologies,
      levelDetailList,
      getItTechnologies,
      getLevelDetailList,
      getWorkstationDetail,
      languagesWithoutLevel,
      getLanguageWithoutLevel,
    } = useGlobals();

    getLanguageWithoutLevel();
    getItTechnologies();
    getLevelDetailList();
    getWorkstationDetail();

    return {
      itTechnologies,
      levelDetailList,
      languagesWithoutLevel,
    };
  },
});
</script>

<style lang="scss"
       scoped>

</style>