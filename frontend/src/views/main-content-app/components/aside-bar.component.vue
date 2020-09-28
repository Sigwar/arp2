<template>
  <aside class="gc-aside-bar">
    <div class="gc-aside-bar__content">

      <div :class="activeLink"
           class="gc-aside-bar__content__circle"></div>

      <div @click="setActiveLink('active-employees')"
           class="gc-aside-bar__content__icon icon-user"></div>

      <div @click="setActiveLink('active-projects')"
           class="gc-aside-bar__content__icon icon-project"></div>
    </div>
  </aside>
</template>

<script>
import { defineComponent }   from '@vue/composition-api';
import { useMainContentApp } from '../hooks/use-main-content-app.js';

export default defineComponent({
  name: 'gcAsideBar',
  setup() {

    const {
      activeLink,
      setActiveLink,
    } = useMainContentApp();

    return {
      activeLink,
      setActiveLink,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-aside-bar {
  background: var(--primary-color);
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 3;
  padding: .5rem;
  display: flex;
  justify-content: center;

  &__content {
    position: fixed;
    margin-top: 20vh;

    &__icon {
      height: 4.7rem;
      width: 4.7rem;
      margin-bottom: 4.1rem;
      cursor: pointer;
      display: block;

      &:nth-child(3) {
        margin-bottom: 0;
      }
    }

    &__circle {
      position: absolute;
      background: var(--primary-color);
      border-radius: 50%;
      height: 3.7rem;
      width: 3.7rem;
      border: .7rem solid var(--white);
      right: -5rem;
      transition: var(--cubic-bezier);
    }

    .active-employees {
      top: .5rem;
    }

    .active-projects {
      top: 9rem;
    }

  }
}
</style>