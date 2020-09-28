<template>
  <div class="gc-employee-detail-profile">

    <el-collapse class="gc-employee-detail-profile__collapse"
                 v-model="activeNames">

      <el-collapse-item class="gc-employee-detail-profile__collapse__item"
                        name="profile">

        <template slot="title">
          <span class="gc-employee-detail-profile__collapse__item__title">Profile</span>
        </template>

        <div class="gc-employee-detail-profile__collapse__item__content">
          <div class="gc-employee-detail-profile__collapse__item__content__wrapper">

            <div class="gc-employee-detail-profile__collapse__item__content__base-info">
              <p class="text">Birthday:
                <span class="value">{{profile.birthDay}}</span>
              </p>

              <p class="text">IT Experience:
                <span class="value">{{profile.itExperience}}</span>
              </p>
            </div>

            <div class="gc-employee-detail-profile__collapse__item__content__base-info">
              <p class="text">Language:
                <span class="value">{{profile.language}}</span>
              </p>
            </div>
          </div>

          <div class="gc-employee-detail-profile__collapse__item__content__it-knowledge">

            IT Knowledge:
            <span :key="item"
                  class="it-tag"
                  v-for="item in profile.itKnowledge">{{ item }}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { defineComponent }          from '@vue/composition-api';
import { useEmployeeDetailProfile } from '../hooks/use-employee-detail-profile';
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

    return {
      profile,
      activeNames,
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
        margin-left: 19rem;

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