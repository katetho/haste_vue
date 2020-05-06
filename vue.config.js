module.exports = {
  devServer: {
    proxy: "https://haste-serv.herokuapp.com"
  },

  pluginOptions: {
    i18n: {
      locale: process.env.VUE_APP_I18N_LOCALE,
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
