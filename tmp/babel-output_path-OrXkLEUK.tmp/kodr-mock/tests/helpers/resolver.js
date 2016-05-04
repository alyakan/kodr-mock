define('kodr-mock/tests/helpers/resolver', ['exports', 'kodr-mock/resolver', 'kodr-mock/config/environment'], function (exports, _kodrMockResolver, _kodrMockConfigEnvironment) {

  var resolver = _kodrMockResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _kodrMockConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _kodrMockConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});