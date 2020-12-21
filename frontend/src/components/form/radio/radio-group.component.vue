<template>
  <el-radio-group v-bind="$attrs"
                  v-on="$listeners"
                  class="gc-radio-group">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-radio-group>
</template>

<script>
export default {
  name: 'gcRadioGroup',
};
</script>

<style lang="scss">
.gc-radio-group {
}
</style>