import ElNotification from 'element-ui/lib/notification';

const state = {};

// getters
const getters = {};

// actions
const actions = {
  openNotifySuccess(context, message) {
    ElNotification.success({
      title: 'Success',
      message,
      type: 'success',
      customClass: 'el-notification--success',
    });
  },
  openNotifyError(context, message) {
    for (const item of message.data.error) {
      setTimeout(() => {
        ElNotification.error({
          title: 'Error',
          message: `${item.msg} - ${item.param}`,
          type: 'error',
          customClass: 'el-notification--error',
        });
      }, 1);
    }
  },
};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};