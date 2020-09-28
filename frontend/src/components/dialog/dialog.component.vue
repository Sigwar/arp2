<template>
  <el-dialog class="gc-dialog"
             v-bind="$attrs"
             v-on="$listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-dialog>
</template>

<script>
export default {
  name: 'gcDialog',
};
</script>

<style lang="scss">
.gc-dialog {

  .el-dialog {
    margin-top: 4.3rem !important;
  }

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 2rem 2rem 3rem;
  }
}
</style>