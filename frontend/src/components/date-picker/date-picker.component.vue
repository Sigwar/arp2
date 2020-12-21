<template>
  <el-date-picker v-bind="$attrs"
                  v-on="$listeners"
                  class="gc-date-picker">

    <slot v-for="(_, slot) of $slots"
          :slot="slot"
          :name="slot" />
  </el-date-picker>
</template>

<script>
export default {
  name: 'gcDatePicker',
};
</script>

<style lang="scss">
.el-month-table {
  .start-date,
  .end-date {
    div {
      .cell {
        color: var(--primary-color);
        background: var(--primary-color) !important;

        &:focus {
          color: var(--primary-color);
        }
      }
    }
  }

  div {
    .cell {
      color: var(--font-color) !important;
    }
  }
}

.el-date-editor {
  border: 1px solid var(--gray-light) !important;
  border-radius: 0 !important;
  transition: var(--transition);

  &--year,
  &--month {
    .el-input__inner {
      border: none;


    }
  }
}

.gc-date-picker {
  width: 100%;

  &:focus,
  &:active {
    border: 1px solid var(--warning) !important;
    box-shadow: var(--input-shadow) !important;
    transition: var(--transition) !important;
  }
}

.el-picker-panel__body {
  .el-date-picker__header {
    &-label {

      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .el-picker-panel__content {
    .el-year-table {
      td {
        .cell {
          color: var(--font-color) !important;
        }

        &.current {
          .cell {
            color: var(--primary-color) !important;
            font-weight: var(--font-bold);
          }
        }
      }
    }
  }
}
</style>