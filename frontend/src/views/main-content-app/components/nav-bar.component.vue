<template>
  <nav class="gc-nav-bar">
    <div class="gc-nav-bar__content">
      <div class="gc-nav-bar__content__wrapper"
           @click="logOut">

        <span class="gc-nav-bar__content__wrapper__label">Logout</span>
        <div class="gc-nav-bar__content__wrapper__icon icon-logout"></div>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent }   from '@vue/composition-api';
import { useMainContentApp } from '../hooks/use-main-content-app.js';

export default defineComponent({
  name: 'gcNavBar',
  setup() {
    const {
      logOut,
    } = useMainContentApp();

    return {
      logOut,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-nav-bar {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
  padding: 1rem;
  box-shadow: var(--nav-shadow);
  display: flex;
  justify-content: flex-end;

  &__content {
    display: flex;
    justify-content: flex-end;
    margin-right: 3rem;

    &__wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      cursor: pointer;
      opacity: .5;
      transition: var(--transition);

      &__label {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 1rem;
        color: var(--gray-dark);
        font-size: 2rem;
      }

      &__icon {
        width: 3.1rem;
        height: 3.1rem;
      }

      &:hover {
        opacity: 1;
        transition: var(--transition);
      }
    }
  }
}
</style>