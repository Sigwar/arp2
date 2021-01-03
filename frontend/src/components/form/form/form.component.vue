<template>
  <el-form ref="form"
           v-bind="$attrs"
           v-on="$listeners"
           class="gc-form">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-form>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api';

export default defineComponent({
  name: 'gcForm',

  setup(props, context) {
    const form = ref(null);

    onMounted(() => {
      context.emit('update:form-ref', form.value);
    });

    return {
      form,
    };
  },
});
</script>

<style lang="scss">
.gc-form {
}
</style>