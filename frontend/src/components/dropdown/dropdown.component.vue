<template>
  <el-dropdown v-bind="$attrs"
               v-on="$listeners"
               class="gc-dropdown">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-dropdown>
</template>

<script>
export default {
  name: 'gcDropdown',
};
</script>

<style lang="scss">

</style>