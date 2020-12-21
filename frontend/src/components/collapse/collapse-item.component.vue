<template>
  <el-collapse v-bind="$attrs"
               v-on="$listeners"
               class="gc-collapse-item">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
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