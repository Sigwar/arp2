<template>
  <el-option v-bind="$attrs"
             v-on="$listeners"
             class="gc-option">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-option>
</template>

<script>
export default {
  name: 'gcOption',
};
</script>

<style lang="scss">
.gc-option {
  &.selected {
    &.el-select-dropdown__item {
      color: var(--primary-color);
    }
  }
}
</style>