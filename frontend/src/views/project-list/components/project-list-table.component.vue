<template>
  <gc-table :data="projects"
            class="gc-project-list-table">

    <gc-table-column class="gc-project-list-table__column"
                     label="Name"
                     prop="name"
                     width="200">

      <template #header>
        <div class="gc-project-list-table__column__header">
          <span class="gc-project-list-table__column__header__label"
                @click="setSort('NAME')">

            Name
            <gc-box-sort :name="'NAME'"></gc-box-sort>
          </span>

        </div>
      </template>
    </gc-table-column>

    <gc-table-column class="gc-project-list-table__column"
                     label="Client"
                     prop="client"
                     width="200">

      <template #header>
        <div class="gc-project-list-table__column__header">
          <span class="gc-project-list-table__column__header__label"
                @click="setSort('CLIENT')">

            Client
            <gc-box-sort :name="'CLIENT'"></gc-box-sort>
          </span>

        </div>
      </template>
    </gc-table-column>

    <gc-table-column class="gc-project-list-table__column"
                     label="Time frame"
                     prop="dateStart"
                     width="200">

      <template slot-scope="scope">
        {{ calculateDifference(scope.row.dateStart, scope.row.dateEnd) }}
      </template>
    </gc-table-column>

    <gc-table-column class="gc-project-list-table__column"
                     label="Topic"
                     prop="topic"
                     width="auto"></gc-table-column>

    <gc-table-column align="center"
                     class="gc-project-list-table__column"
                     label="Actions"
                     prop="uuid"
                     width="260">

      <template slot-scope="scope">
        <span class="gc-project-list-table__column__action gc-project-list-table__column__action--red"
              @click="setProjectToDelete(scope.row)">DELETE {{ scope.row.index }}</span>

        <span class="gc-project-list-table__column__action gc-project-list-table__column__action--yellow"
              @click="setProjectDetail(scope.row)">EDIT</span>
      </template>
    </gc-table-column>
  </gc-table>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useProjectList }  from '../hooks/use-project-list.js';
import { useGlobals }      from '../../../hooks/use-globals';
import gcTable             from '@/components/table/table.component.vue';
import gcTableColumn       from '@/components/table/table-column.component.vue';
import gcBoxSort           from './box-sort.component';

export default defineComponent({
  name: 'gcProjectListTable',
  components: {
    gcTable,
    gcTableColumn,
    gcBoxSort,
  },

  setup() {
    const {
      setSort,
      projects,
      setProjectDetail,
      setProjectToDelete,
    } = useProjectList();

    const {
      calculateDifference,
    } = useGlobals();

    return {
      setSort,
      projects,
      setProjectDetail,
      setProjectToDelete,
      calculateDifference,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-project-list-table {
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
      }

      .active {
        border: 3px solid var(--primary-color);
      }

      .inactive {
        border: 3px solid var(--gray-dark);
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
        margin-right: 4rem;
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