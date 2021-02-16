<template>
  <div class="gc-registration-form">
    <h1 class="gc-registration-form__title gc-registration-form__title--lobster">
      Registration
    </h1>

    <gc-form :form-ref.sync="refForm"
             :model="registrationForm"
             :rules="rules"
             class="gc-registration-form__form">

      <gc-form-item class="gc-registration-form__form__item"
                    label="Login / Company name"
                    prop="name">

        <gc-input v-model="registrationForm.name"></gc-input>
      </gc-form-item>

      <gc-form-item class="gc-registration-form__form__item"
                    label="E-mail"
                    prop="email">

        <gc-input v-model="registrationForm.email"></gc-input>
      </gc-form-item>

      <gc-form-item class="gc-registration-form__form__item"
                    label="Password"
                    prop="password"
                    type="password">

        <gc-input v-model="registrationForm.password"
                  type="password"></gc-input>

      </gc-form-item>

      <gc-form-item class="gc-registration-form__form__item"
                    label="Repeat password"
                    prop="repeatPassword"
                    type="password">

        <gc-input v-model="registrationForm.repeatPassword"
                  type="password"></gc-input>

      </gc-form-item>

      <gc-form-item class="gc-registration-form__form__item">

        <gc-button class="gc-registration-form__form__item__btn"
                   type="default"
                   @click.native.prevent="registerAccount(refForm)">Registration
        </gc-button>

        <span class="gc-registration-form__form__item__login"
              @click="goToLogin">Go to login page
        </span>
      </gc-form-item>
    </gc-form>
  </div>
</template>

<script>
import { useRegistrationForm } from '../hooks/use-registration';
import { defineComponent }     from '@vue/composition-api';
import gcInput                 from '@/components/form/input/input.component.vue';
import gcButton                from '@/components/form/button/button.component.vue';
import gcForm                  from '@/components/form/form/form.component.vue';
import gcFormItem              from '@/components/form/form-item/form-item.component.vue';

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
      rules,
      refForm,
      goToLogin,
      registerAccount,
      registrationForm,
    } = useRegistrationForm();

    return {
      rules,
      refForm,
      goToLogin,
      registerAccount,
      registrationForm,
    };
  },
});
</script>

<style lang="scss"
       scoped>
.gc-registration-form {
  background: var(--white);
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

      &__login {
        font-size: 1.8rem;
        margin-top: 1rem;
        text-align: center;
        display: block;

        &:hover {
          color: var(--warning);
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
</style>