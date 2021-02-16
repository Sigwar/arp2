<template>
  <div class="gc-registration">
    <gc-registration-form />
  </div>
</template>

<script>
import { defineComponent, onUnmounted } from '@vue/composition-api';
import gcRegistrationForm               from './components/registration-form.component';
import store                            from '@/store/store';
import registrationModule               from './store/registration.store';

export default defineComponent({
  name: 'gcRegistration',
  components: {
    gcRegistrationForm,
  },
  setup() {
    store.registerModule('registrationModule', registrationModule);

    onUnmounted(() => {
      store.unregisterModule('registrationModule');
    });
  },
});
</script>

<style lang="scss"
       scoped>
.gc-registration {
  height: 100vh;
  width: 100vw;
  background: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>