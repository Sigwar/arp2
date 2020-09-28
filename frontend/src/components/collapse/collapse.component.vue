<template>
  <el-collapse class="gc-collapse"
               v-bind="$attrs"
               v-on="$listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
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