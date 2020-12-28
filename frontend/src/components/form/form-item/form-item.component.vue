<template>
  <el-form-item v-bind="$attrs"
                v-on="$listeners"
                class="gc-form-item">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-form-item>
</template>

<script>
export default {
  name: 'gcFormItem',
};
</script>

<style lang="scss">
.gc-form-item {
  .el-form-item__error {
    padding-top: 1px;
  }
}
</style>

<style lang="scss">
.gc-form-item {
  &.el-form-item {
    margin-bottom: 1.5rem;
  }

  .el-form-item__label {
    color: var(--black);
    text-transform: uppercase;
    font-size: 1.2rem;
    line-height: 3rem;
  }
}
</style>