<template>
  <el-select class="gc-select"
             v-bind="$attrs"
             v-on="$listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-select>
</template>

<script>
export default {
  name: 'gcSelect',
};
</script>

<style lang="scss">
.gc-select {
  width: 100%;

  .el-input {
    .el-input__inner {
      background: var(--background);
      border: 1px solid var(--gray-light) !important;
      border-radius: 0;
      width: 100%;

      &:hover {
        border: 1px solid var(--warning) !important;
      }

      &:focus {
        border: 1px solid var(--warning) !important;
      }
    }

    .el-input__suffix {
      background: var(--primary-color);
      right: 0;
      width: 4rem;

      .el-select__caret {
        color: var(--white);
      }
    }
  }
}

.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: var(--primary-color) !important;
}
</style>