<template>
  <div class="gc-login-form">
    <h1 class="gc-login-form__title gc-login-form__title--lobster">
      Sign in
    </h1>

    <gc-form ref="gcLoginForm"
             :model="loginForm"
             class="gc-login-form__form">

      <gc-form-item class="gc-login-form__form__item"
                    label="Login"
                    prop="login">

        <gc-input v-model="loginForm.login"></gc-input>

      </gc-form-item>

      <gc-form-item class="gc-login-form__form__item"
                    label="Password"
                    prop="password">

        <gc-input v-model="loginForm.password"
                  type="password"></gc-input>

      </gc-form-item>

      <gc-form-item class="gc-login-form__form__item">

        <gc-button class="gc-login-form__form__item__btn"
                   type="default"
                   @click="signIn">Login
        </gc-button>

      </gc-form-item>
    </gc-form>
  </div>
</template>

<script>
import { useLoginForm }    from '../hooks/use-login.js';
import { defineComponent } from '@vue/composition-api';
import gcInput             from '@/components/form/input/input.component.vue';
import gcButton            from '@/components/form/button/button.component.vue';
import gcForm              from '@/components/form/form/form.component.vue';
import gcFormItem          from '@/components/form/form-item/form-item.component.vue';

export default defineComponent({
  name: 'gcLoginForm',
  components: {
    gcForm,
    gcInput,
    gcButton,
    gcFormItem,
  },

  setup() {

    const {
      signIn,
      loginForm,
    } = useLoginForm();

    return {
      signIn,
      loginForm,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-login-form {
  background: var(--white);
  height: 40rem;
  width: 40rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1rem;

  &__title {
    text-align: center;
    font-size: 4rem;
    color: var(--font-color);
    font-family: var(--secondary-font-family);
  }

  &__form {
    padding: 0 4rem;

    &__item {
      &__btn {
        margin: 2rem auto 0;
        display: block;
      }
    }
  }
}
</style>