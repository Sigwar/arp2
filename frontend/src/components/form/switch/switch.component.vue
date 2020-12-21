<template>
  <el-switch v-bind="$attrs"
             v-on="$listeners"
             class="gc-switch">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-switch>
</template>

<script>
export default {
  name: 'gcInput',
};
</script>

<style lang="scss">
.gc-switch.el-switch.is-checked {
  .el-switch__core {
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
  }
}
</style>