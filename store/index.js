import Vuex from 'vuex'

import config from '@/store/config'
import notices from '@/store/notices'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      config,
      notices,
    }
  })
};

export default createStore
