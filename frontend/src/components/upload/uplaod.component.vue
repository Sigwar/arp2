<template>
  <el-upload v-bind="$attrs"
             v-on="$listeners"
             class="gc-upload">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-upload>
</template>

<script>
export default {
  name: 'gcUpload',
};
</script>

<style lang="scss">
.el-upload {
  height: 100%;
  width: 100%;
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>