<template>
  <el-form v-bind="$attrs"
           v-on="$listeners"
           class="gc-form">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-form>
</template>

<script>
export default {
  name: 'gcForm',
};
</script>

<style lang="scss">
.gc-form {
}
</style>