<template>
  <el-checkbox v-bind="$attrs"
               v-on="$listeners"
               class="gc-checkbox">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-checkbox>
</template>

<script>
export default {
  name: 'gcCheckbox',
};
</script>

<style lang="scss">
.gc-checkbox {
  display: flex !important;
  align-items: center;
  justify-content: center;
  color: var(--gray-light) !important;

  .is-checked {
    & + .el-checkbox__label {
      color: var(--font-color) !important;
    }

    &.el-checkbox__input {
      border: 1px solid var(--primary-color) !important;
    }

    .el-checkbox__inner {
      background-color: var(--primary-color) !important;
      border-color: var(--primary-color) !important;

      &:after {
        border-color: var(--black);
        width: 0.5rem;
        top: 0.3rem;
        left: 0.9rem;
        height: 1.2rem;
      }
    }
  }

  .el-checkbox__label {
    font-weight: bold;
    font-size: 1.7rem;
  }

  .el-checkbox__input {
    border: 1px solid var(--gray-light);
    height: 2.3rem;
    width: 2.3rem;

    .el-checkbox__inner {
      background: var(--grey);
      height: 2.3rem;
      width: 2.3rem;
      border: none;
      border-radius: 0;
    }
  }
}
</style>