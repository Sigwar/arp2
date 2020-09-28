<template>
  <el-tooltip class="gc-tooltip"
              v-bind="$attrs"
              v-on="$listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-tooltip>
</template>

<script>
export default {
  name: 'gcDialog',
};
</script>

<style lang="scss">
.gc-tooltip {

}
</style>