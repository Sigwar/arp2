<template>
  <div class="gc-project"
       @mouseenter="isHover = true"
       @mouseleave="isHover = false">

    <div class="gc-project__circle"></div>
    <div class="gc-project__content">
      <div class="gc-project__content__header">
        <span class="gc-project__content__header__date">{{ calculateDifference(detail.dateStart, detail.dateEnd) }}</span>

        <span v-show="isHover"
              class="gc-project__content__header__wrapper">

        <span class="gc-project__content__header__remove"
              @click="removeProject(detail)">REMOVE</span>

        <span class="gc-project__content__header__edit"
              @click="editProject(detail)">EDIT</span>
        </span>
      </div>

      <h2 class="gc-project__content__name">{{ detail.name }}
        <span class="gc-project__content__name--small">for</span>
        {{ detail.client }}</h2>

      <p v-if="detail.description !== ''"
         v-show="showDescription"
         class="gc-project__content__description">{{ detail.description }}</p>

      <p v-if="detail.topic !== ''"
         v-show="showTopic"
         class="gc-project__content__topic">

        <span class="gc-project__content__topic__label">Topic: </span>{{ detail.topic }}
      </p>

      <p class="gc-project__content__role">
        <span class="gc-project__content__role__label">Role: </span>

        <span v-for="role in detail.roles"
              :key="role"
              class="gc-project__content__role__value">{{ role }}</span>
      </p>
      <p class="gc-project__content__technologies">
        <span class="gc-project__content__technologies__label">Technologies: </span>

        <span v-for="technologie in detail.technologies"
              :key="technologie"
              class="gc-project__content__role__value gc-project__content__role__value--tag">{{ technologie }}</span>
      </p>
      <p class="gc-project__content__activities">
        <span class="gc-project__content__activities__label">Activities: </span>

        <span v-for="activitie in detail.activities"
              :key="activitie"
              class="gc-project__content__activities__value">{{ activitie }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useProject }      from './hooks/use-project';
import { useGlobals }      from '../../hooks/use-globals';

export default defineComponent({
  name: 'gcProject',
  props: {
    detail: Object,
    showDescription: true,
    showTopic: true,
  },

  setup(props, context) {

    const {
      isHover,
      editProject,
      removeProject,
    } = useProject(context);

    const {
      calculateDifference,
    } = useGlobals();

    return {
      isHover,
      editProject,
      removeProject,
      calculateDifference,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-project {
  display: flex;
  align-items: flex-start;
  margin-bottom: 4.1rem;

  &__circle {
    min-width: 2.9rem;
    min-height: 2.9rem;
    border-radius: 50%;
    border: 5px solid var(--primary-color);
    margin-right: 1.9rem;
    margin-top: 3.1rem;
  }

  &__content {
    position: relative;
    width: 100%;

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

      &__wrapper {
        position: absolute;
        top: 0;
        right: 0;
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
    }

    &__name {
      margin: 0;
      font-size: 3.1rem;
      line-height: 1;
      font-weight: var(--font-bold);

      &--small {
        font-size: 2rem;
        font-weight: var(--font-medium);
        color: var(--gray-light);
      }
    }

    &__description {
      font-size: 1.7rem;
      line-height: 1.45;
      color: var(--gray-dark);
      margin: 1.25rem 0;
    }

    &__topic,
    &__role,
    &__technologies,
    &__activities {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      font-size: 1.7rem;
      margin: .75rem 0;

      &__label {
        font-size: 1.7rem;
        font-weight: var(--font-bold);
        margin-right: 5px;
      }

      &__value {
        margin-right: 5px;

        &:last-child {
          &:after {
            content: ''
          }
        }

        &:after {
          content: ','
        }

        &--tag {
          font-weight: var(--font-bold);
          border-radius: 2px;
          background: var(--primary-color);
          padding: .3rem .7rem;
          margin: .3rem .5rem;
          font-size: 1.7rem;

          &:after {
            content: ''
          }
        }
      }
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>