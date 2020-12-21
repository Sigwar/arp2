<template>
  <el-button v-bind="$attrs"
             v-on="$listeners"
             class="gc-button">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-button>
</template>

<script>
export default {
  name: 'gcButton',
};
</script>

<style lang="scss">
.el-button {
  &--default {
    border: 2px solid var(--primary-color) !important;
    border-radius: 0 !important;
    font-weight: bold !important;
    text-transform: uppercase;
    transition: .25s;

    &:hover,
    &:focus {
      transition: .25s;
      color: var(--grey-600) !important;
      background: var(--primary-color) !important;
    }
  }

  &--info {
    border: 2px solid var(--gray-light) !important;
    background: var(--white) !important;
    color: var(--gray-light) !important;
    border-radius: 0 !important;
    font-weight: bold !important;
    text-transform: uppercase;
    transition: .25s;

    &:hover,
    &:focus {
      transition: .25s;
      color: var(--white) !important;
      background: var(--gray-light) !important;
    }
  }

  &--danger {
    border: 2px solid var(--error) !important;
    background: var(--white) !important;
    color: var(--error) !important;
    border-radius: 0 !important;
    font-weight: bold !important;
    text-transform: uppercase;
    transition: .25s;

    &:hover,
    &:focus {
      transition: .25s;
      color: var(--white) !important;
      background: var(--error) !important;
    }
  }
}

.el-button + .el-button {
  margin-left: 0 !important;
}

</style>