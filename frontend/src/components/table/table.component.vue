<template>
  <el-table v-bind="$attrs"
            v-on="$listeners"
            class="gc-table">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-table>
</template>

<script>
export default {
  name: 'gcTable',
};
</script>

<style lang="scss">
.gc-table {
  .el-table__header {
    thead,
    tbody {
      tr {
        th {
          margin: 0;
          padding-top: .1rem;
          padding-bottom: .1rem;
          border: none;
          font-size: 1.7rem;
          color: var(--font-color);

          .cell {
            padding: .5rem 1rem;
            background: none;
            max-height: 5rem;
            font-weight: 800;
          }
        }
      }
    }
  }

  .el-table__row {

    td {
      border: none;
      padding-top: .1rem;
      padding-bottom: .1rem;

      .cell {
        border: none;
        margin: .5rem;
        min-height: 4.5rem;
        padding: 1rem;
        font-size: 1.7rem;
        color: var(--font-color);
        font-weight: 600;
      }
    }
  }
}
</style>