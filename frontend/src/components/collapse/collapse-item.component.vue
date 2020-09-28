<template>
  <el-collapse class="gc-collapse-item"
               v-bind="$attrs"
               v-on="$listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-collapse>
</template>

<script>
export default {
  name: 'gcCollapseItem',
};
</script>

<style lang="scss">
.el-collapse-item__header {
  border-bottom: 2px solid var(--primary-color) !important;
}

.el-collapse-item__wrap {
  border: none !important;
}

.el-collapse-item__arrow {
  font-size: 3.1rem;
}
</style>