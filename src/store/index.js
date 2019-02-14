import vue from 'vue'
import vuex from 'vuex';

import addInfo from './modules/addInfo'

vue.use(vuex);

export default new vuex.Store({
  modules: {
    addInfo
  }
});
