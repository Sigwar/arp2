<template>
  <el-progress v-bind="$attrs"
               v-on="$listeners"
               class="gc-progress">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-progress>
</template>

<script>
export default {
  name: 'gcProgress',
};
</script>

<style lang="scss">
.gc-progress {
}
</style>