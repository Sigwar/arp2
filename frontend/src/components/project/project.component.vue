<template>
  <div @mouseenter="isHover = true"
       @mouseleave="isHover = false"
       class="gc-project">

    <div class="gc-project__circle"></div>
    <div class="gc-project__content">
      <div class="gc-project__content__header">
        <span class="gc-project__content__header__date">{{detail.date[0]}} - {{detail.date[1]}}</span>

        <span class="gc-project__content__header__wrapper"
              v-show="isHover">

        <span @click="removeProject(detail)"
              class="gc-project__content__header__remove">REMOVE</span>

        <span @click="editProject(detail)"
              class="gc-project__content__header__edit">EDIT</span>
        </span>
      </div>

      <h2 class="gc-project__content__name">{{detail.projectName}}
        <span class="gc-project__content__name--small">for</span>
        {{detail.clientName}}</h2>
      <p class="gc-project__content__description">{{detail.description}}</p>

      <p class="gc-project__content__topic">
        <span class="gc-project__content__topic__label">Topic: </span>{{detail.topic}}
      </p>

      <p class="gc-project__content__role">
        <span class="gc-project__content__role__label">Role: </span>

        <span :key="role"
              class="gc-project__content__role__value"
              v-for="role in detail.roles">{{role}}</span>
      </p>
      <p class="gc-project__content__technologies">
        <span class="gc-project__content__technologies__label">Technologies: </span>

        <span :key="technologie"
              class="gc-project__content__role__value gc-project__content__role__value--tag"
              v-for="technologie in detail.technologies">{{technologie}}</span>
      </p>
      <p class="gc-project__content__activities">
        <span class="gc-project__content__activities__label">Activities: </span>

        <span :key="activitie"
              class="gc-project__content__activities__value"
              v-for="activitie in detail.activities">{{activitie}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useProject }      from './hooks/use-project';

export default defineComponent({
  name: 'gcProject',
  props: {
    detail: Object,
  },

  setup(props, context) {

    const {
      isHover,
      editProject,
      removeProject,
    } = useProject(context);

    return {
      isHover,
      editProject,
      removeProject,
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
}
</style>