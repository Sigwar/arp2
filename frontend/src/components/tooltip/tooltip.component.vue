<template>
  <el-tooltip v-bind="$attrs"
              v-on="$listeners"
              class="gc-tooltip">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
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