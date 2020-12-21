<template>
  <el-input v-bind="$attrs"
            v-on="$listeners"
            class="gc-input">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-input>
</template>

<script>
export default {
  name: 'gcInput',
};
</script>

<style lang="scss">
.gc-input {

  .el-textarea__inner,
  .el-input__inner {
    border: 1px solid var(--gray-light);
    border-radius: 0;
    transition: var(--transition);

    &:focus,
    &:active {
      border: 1px solid var(--warning);
      box-shadow: var(--input-shadow);
      transition: var(--transition);
    }
  }
}
</style>