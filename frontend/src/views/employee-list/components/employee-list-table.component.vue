<template>
  <gc-table :data="employees"
            class="gc-employee-list-table">

    <gc-table-column class="gc-employee-list-table__column"
                     label="Name"
                     prop="name">

      <template #header>
        <div class="gc-employee-list-table__column__header">
          <span class="gc-employee-list-table__column__header__label"
                @click="setSort('NAME')">

            Name
            <gc-box-sort :name="'NAME'"></gc-box-sort>
          </span>

        </div>
      </template>

      <template slot-scope="scope">
        <div class="gc-employee-list-table__column__name">

          <img v-if="scope.row.picture !== ''"
               :alt="scope.row.lastName"
               :class="{'active' : scope.row.isActive,
                        'inactive' : !scope.row.isActive}"
               :src="scope.row.picture"
               class="gc-employee-list-table__column__name__picture">

          <img v-else
               :alt="scope.row.lastName"
               :class="{'active' : scope.row.isActive,
                        'inactive' : !scope.row.isActive}"
               class="gc-employee-list-table__column__name__picture gc-employee-list-table__column__name__picture--small"
               src="../../../assets/icons/user/user-fill.svg">

          {{ scope.row.name }} {{ scope.row.lastName }}
        </div>
      </template>
    </gc-table-column>

    <gc-table-column class="gc-employee-list-table__column"
                     label="Profession"
                     prop="profession">

      <template #header>
        <div class="gc-employee-list-table__column__header">
          <span class="gc-employee-list-table__column__header__label"
                @click="setSort('workstationId')">

            Profession
            <gc-box-sort :name="'workstationId'"></gc-box-sort>
          </span>

        </div>
      </template>
    </gc-table-column>

    <gc-table-column class="gc-employee-list-table__column"
                     label="Level"
                     prop="level">

      <template #header>
        <div class="gc-employee-list-table__column__header">

          <span class="gc-employee-list-table__column__header__label"
                @click="setSort('levelId')">

            Level
            <gc-box-sort :name="'levelId'"></gc-box-sort>
          </span>

        </div>
      </template>
    </gc-table-column>

    <gc-table-column align="center"
                     class="gc-employee-list-table__column"
                     label="Actions"
                     prop="uuid">

      <template slot-scope="scope">
        <span class="gc-employee-list-table__column__action gc-employee-list-table__column__action--red">PDF {{ scope.row.index }}</span>
        <span class="gc-employee-list-table__column__action gc-employee-list-table__column__action--red-dark">BLIND PDF</span>

        <span class="gc-employee-list-table__column__action gc-employee-list-table__column__action--yellow"
              @click="goToDetail(scope.row.uuid)">EDIT</span>

      </template>
    </gc-table-column>
  </gc-table>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useEmployeeList } from '../hooks/use-employee-list';
import gcTable             from '@/components/table/table.component.vue';
import gcTableColumn       from '@/components/table/table-column.component.vue';
import gcBoxSort           from '../components/box-sort.component.vue';

export default defineComponent({
  name: 'gcEmployeeListTable',
  components: {
    gcTable,
    gcTableColumn,
    gcBoxSort,
  },

  setup() {
    const {
      setSort,
      employees,
      goToDetail,
    } = useEmployeeList();

    return {
      setSort,
      employees,
      goToDetail,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-employee-list-table {
  margin-top: 4.1rem;

  &__column {
    &__header {
      display: flex;
      align-items: center;

      &__label {
        display: flex;
        align-items: center;
        max-height: 3rem;
        cursor: pointer;
      }
    }

    &__name {
      display: flex;
      align-items: center;

      &__picture {
        height: 4.7rem;
        width: 4.7rem;
        border-radius: 50%;
        margin-right: 1rem;
        object-fit: fill;

        &--small {
          padding: 0.5rem;
        }
      }

      .active {
        border: 3px solid var(--primary-color);
      }

      .inactive {
        border: 3px solid var(--gray-dark);

        &.gc-employee-list-table__column__name__picture--small {
          filter: grayscale(1) brightness(.5);
        }
      }
    }

    &__action {
      font-weight: 800;
      font-size: 1.4rem;
      cursor: pointer;
      opacity: .53;
      transition: var(--transition);

      &--red {
        color: var(--red);
      }

      &--red-dark {
        color: var(--red-dark);
        margin: 0 3.1rem;
      }

      &--yellow {
        color: var(--primary-color);
      }

      &--red,
      &--red-dark,
      &--yellow {
        &:hover {
          opacity: 1;
          transition: var(--transition);
        }
      }
    }
  }
}
</style>