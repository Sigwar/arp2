<template>
  <el-checkbox-group v-bind="$attrs"
                     v-on="$listeners"
                     class="gc-checkbox-group">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'gcCheckboxGroup',
};
</script>

<style lang="scss">
.gc-checkbox-group {
}
</style>