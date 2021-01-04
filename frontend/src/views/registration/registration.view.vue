<template>
  <div class="gc-registration">
    <gc-registration-form />
  </div>
</template>

<script>
import gcRegistrationForm from './components/registration-form.component';

export default {
  name: 'gcRegistration',
  components: {
    gcRegistrationForm,
  },
};
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