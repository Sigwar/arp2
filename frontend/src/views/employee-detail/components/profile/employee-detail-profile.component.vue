<template>
  <div class="gc-employee-detail-profile">

    <el-collapse v-model="activeNames"
                 class="gc-employee-detail-profile__collapse">

      <el-collapse-item class="gc-employee-detail-profile__collapse__item"
                        name="profile">

        <template slot="title">
          <span class="gc-employee-detail-profile__collapse__item__title">Profile</span>
        </template>

        <div class="gc-employee-detail-profile__collapse__item__content">
          <div class="gc-employee-detail-profile__collapse__item__content__wrapper">

            <div class="gc-employee-detail-profile__collapse__item__content__base-info">

              <p v-if="profile.birthday"
                 class="text">Birthday:
                <span class="value">{{ profile.birthday }}</span>
              </p>

              <p v-if="profile.itExperience !== ''"
                 class="text">IT Experience:
                <span class="value">{{ calculateDifference(profile.itExperience) }}</span>
              </p>
            </div>

            <div class="gc-employee-detail-profile__collapse__item__content__base-info">

              <p v-if="Array.isArray(profile.languages) && profile.languages.length"
                 class="text">

                Languages:
                <span v-for="item in profile.languages"
                      :key="item"
                      class="value">{{ item }}</span>
              </p>
            </div>
          </div>

          <div v-if="Array.isArray(profile.itTechnologies) && profile.itTechnologies"
               class="gc-employee-detail-profile__collapse__item__content__it-knowledge">

            IT Knowledge:
            <span v-for="item in profile.itTechnologies"
                  :key="item"
                  class="it-tag">{{ item }}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { defineComponent }          from '@vue/composition-api';
import { useEmployeeDetailProfile } from '../../hooks/use-employee-detail-profile';
import { useGlobals }               from '../../../../hooks/use-globals';
import gcCollapse                   from '@/components/collapse/collapse.component.vue';
import gcCollapseItem               from '@/components/collapse/collapse-item.component.vue';

export default defineComponent({
  name: 'gcEmployeeDetailProfile',
  components: {
    gcCollapse,
    gcCollapseItem,
  },

  setup() {

    const activeNames = 'profile';

    const {
      profile,
    } = useEmployeeDetailProfile();

    const {
      calculateDifference,
    } = useGlobals();

    return {
      profile,
      activeNames,
      calculateDifference,
    };
  },
});
</script>


<style lang="scss"
       scoped>

.gc-employee-detail-profile {
  margin-bottom: 5rem;

  &__collapse {
    &__item {
      &__title {
        padding: 0 3.1rem;
        background: var(--primary-color);
        border-bottom: 1px solid var(--primary-color);
        font-weight: var(--font-bold);
        font-size: 1.9rem;
        letter-spacing: 4px;
      }

      &__content {
        padding: 2rem;
        margin-left: 18rem;

        &__wrapper {
          display: flex;
        }

        &__base-info {
          width: 50%;

          .text {
            font-weight: var(--font-medium);
            font-size: 1.9rem;

            .value {
              margin-left: 1rem;
              font-weight: var(--font-bold);

              &:after {
                content: ',';
                margin-left: 1px;
              }

              &:last-child {
                &:after {
                  content: ''
                }
              }
            }
          }
        }

        &__it-knowledge {
          font-weight: var(--font-medium);
          font-size: 1.9rem;

          .it-tag {
            font-weight: var(--font-bold);
            border-radius: 2px;
            background: var(--primary-color);
            padding: .4rem .7rem;
            margin: .3rem .7rem;
            font-size: 1.7rem;
          }
        }
      }
    }
  }
}
</style>