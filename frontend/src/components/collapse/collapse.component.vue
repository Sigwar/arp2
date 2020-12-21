<template>
  <el-collapse v-bind="$attrs"
               v-on="$listeners"
               class="gc-collapse">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-collapse>
</template>

<script>
export default {
  name: 'gcCollapse',
};
</script>

<style lang="scss">
.el-collapse {
  border-top: none !important;
}
</style>