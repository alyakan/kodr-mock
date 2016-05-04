define('kodr-mock/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'kodr-mock/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _kodrMockConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_kodrMockConfigEnvironment['default'].APP.name, _kodrMockConfigEnvironment['default'].APP.version)
  };
});