const SET_LANG = 'config/SET_LANG';
const SET_DIRECTION = 'config/SET_DIRECTION';

export default {
  state: {
    locales: ['en', 'fr', 'ar'],
    locale: 'en',
    direction: 'ltr'
  },
  getters: {
    getLocales: function (state) {
      return state.locales
    },
    getLocale: function (state) {
      return state.locale
    },
    getDirection: function (state) {
      return state.direction
    },
  },
  mutations: {
    [SET_LANG](state, locale) {
      state.locale = locale
    },
    [SET_DIRECTION](state, direction) {
      state.direction = direction
    },
  },
  actions: {
    setLocale({commit}, {locale}) {
      commit(SET_LANG, locale);
      return locale;
    },
    setDirection({commit}, {direction}) {
      commit(SET_DIRECTION, direction);
      return direction;
    }
  }
}
