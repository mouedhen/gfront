import Vuex from 'vuex'

import config from '@/store/config'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      config,
    }
  })
};

export default createStore
