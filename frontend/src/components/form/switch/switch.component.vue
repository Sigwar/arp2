<template>
  <el-switch class="gc-switch"
             v-bind="$attrs"
             v-on="$listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
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