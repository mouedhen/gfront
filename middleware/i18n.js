export default function ({isHMR, app, store, route, params, error, redirect}) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;

  // Get locale from params
  const locale = params.lang || 'ar';
  if (store.state.config.locales.indexOf(locale) === -1) {
    return error({message: 'This page could not be found.', statusCode: 404})
  }

  // Set locale
  store.dispatch('setLocale', {locale});

  // Set text direction
  if(store.state.config.locale === 'ar') {
    store.dispatch('setDirection', {direction: 'rtl'})
  } else {
    store.dispatch('setDirection', {direction: 'tlr'})
  }

  app.i18n.locale = store.state.config.locale;
}
