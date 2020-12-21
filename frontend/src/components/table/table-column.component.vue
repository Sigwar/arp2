<template>
  <el-table-column v-bind="$attrs"
                   v-on="$listeners"
                   class="gc-table-column">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />

    <template v-for="slot in Object.keys($scopedSlots)"
              :slot="slot"
              slot-scope="scope">

      <slot v-bind="scope"
            :name="slot" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'gcTableColumn',
};
</script>

<style lang="scss">
</style>