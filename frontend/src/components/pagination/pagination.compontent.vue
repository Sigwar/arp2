<template>
  <el-pagination v-bind="$attrs"
                 v-on="$listeners"
                 background
                 class="gc-pagination"
                 layout="prev, pager, next, total">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-pagination>
</template>

<script>
export default {
  name: 'gcPagination',
};
</script>

<style lang="scss"
       scoped>
.gc-pagination {
  margin-top: 3rem;
}
</style>