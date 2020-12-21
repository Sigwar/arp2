<template>
  <el-dropdown-menu v-bind="$attrs"
                    v-on="$listeners"
                    class="gc-dropdown-menu">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-dropdown-menu>
</template>

<script>
export default {
  name: 'gcDropdownMenu',
};
</script>

<style lang="scss">
.gc-dropdown-menu {
  min-width: 15rem;
}
</style>