<template>
  <div class="gc-education"
       @mouseenter="isHover = true"
       @mouseleave="isHover = false">

    <div class="gc-education__circle"></div>

    <div class="gc-education__content">
      <div class="gc-education__content__header">
        <span class="gc-education__content__header__date">{{ dateYYYYMM(detail.date[ 0 ]) }} - {{ dateYYYYMM(detail.date[ 1 ]) }}</span>

        <span v-show="isHover"
              class="gc-education__content__header__wrapper">

          <span class="gc-education__content__header__remove"
                @click="removeEducation(detail)">REMOVE</span>

          <span class="gc-education__content__header__edit"
                @click="editEducation(detail)">EDIT</span>
        </span>
      </div>
      <h2 class="gc-education__content__name">{{ detail.schoolName }}</h2>
      <p class="gc-education__content__description">{{ detail.description }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useEducation }    from './hooks/use-education';
import { useGlobals }      from '../../hooks/use-globals';

export default defineComponent({
  name: 'gcEducation',
  props: {
    detail: Object,
  },

  setup(props, context) {

    const {
      dateYYYYMM,
    } = useGlobals();

    const {
      isHover,
      editEducation,
      removeEducation,
    } = useEducation(context);

    return {
      isHover,
      dateYYYYMM,
      editEducation,
      removeEducation,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-education {
  display: flex;
  align-items: flex-start;
  margin-bottom: 3.7rem;

  &:last-child {
    margin-bottom: 0;
  }

  &__circle {
    min-width: 2.9rem;
    min-height: 2.9rem;
    border-radius: 50%;
    border: 5px solid var(--primary-color);
    margin-right: 1.9rem;
    margin-top: 3.1rem;
  }

  &__content {
    width: 100%;
    position: relative;

    &__header {
      display: flex;
      justify-content: space-between;

      &__remove {
        color: var(--red);
        margin-right: 2.7rem;
      }

      &__edit {
        color: var(--primary-color);
      }

      &__remove,
      &__edit {
        opacity: .5;
        font-weight: 800;
        font-size: 1.4rem;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }

      &__date {
        font-size: 1.7rem;
        color: var(--gray-light);
        font-weight: var(--font-bold);
        letter-spacing: 1.7px;
      }

      &__wrapper {
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    &__name {
      margin: 0;
      font-size: 3.1rem;
      line-height: 1;
      font-weight: var(--font-bold);
    }

    &__description {
      font-size: 1.7rem;
      line-height: 1.45;
      color: var(--gray-dark)
    }
  }
}
</style>