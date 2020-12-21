<template>
  <el-tag v-bind="$attrs"
          v-on="$listeners"
          class="gc-tag">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-tag>
</template>

<script>
export default {
  name: 'gcTag',
};
</script>

<style lang="scss">
.gc-tag {
  &.el-tag {
    color: var(--font-color);
    background: var(--primary-color-20);
    border-color: vaR(--primary-color);
    margin-right: .85rem;
    border-radius: 1px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    .el-tag__close {
      color: var(--primary-color);

      &:hover {
        background: var(--primary-color);
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>