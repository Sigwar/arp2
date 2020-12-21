<template>
  <div class="gc-certificate"
       @mouseenter="isHover = true"
       @mouseleave="isHover = false">

    <div class="gc-certificate__circle"></div>

    <div class="gc-certificate__content">
      <div class="gc-certificate__content__header">
        <span class="gc-certificate__content__header__date">{{ dateYYYY(detail.date) }}</span>

        <span v-show="isHover"
              class="gc-certificate__content__header__wrapper">

          <span class="gc-certificate__content__header__remove"
                @click="removeCertificate(detail)">REMOVE</span>

          <span class="gc-certificate__content__header__edit"
                @click="editCertificate(detail)">EDIT</span>
        </span>
      </div>
      <h2 class="gc-certificate__content__name">{{ detail.name }}

        <span v-if="detail.credentialId"
              class="gc-certificate__content__credential"> - {{ detail.credentialId }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useCertificate }  from './hook/use-certificate';
import { useGlobals }      from '../../hooks/use-globals';

export default defineComponent({
  name: 'gcEducation',
  props: {
    detail: Object,
  },

  setup(props, context) {

    const {
      dateYYYY,
    } = useGlobals();

    const {
      isHover,
      editCertificate,
      removeCertificate,
    } = useCertificate(context);

    return {
      isHover,
      dateYYYY,
      editCertificate,
      removeCertificate,
    };
  },
});
</script>

<style lang="scss"
       scoped>

.gc-certificate {
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
    }

    &__credential {
      font-size: 2rem;
      color: var(--gray-dark)
    }
  }
}
</style>