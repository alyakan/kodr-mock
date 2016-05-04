define('kodr-mock/app', ['exports', 'ember', 'kodr-mock/resolver', 'ember-load-initializers', 'kodr-mock/config/environment'], function (exports, _ember, _kodrMockResolver, _emberLoadInitializers, _kodrMockConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _kodrMockConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _kodrMockConfigEnvironment['default'].podModulePrefix,
    Resolver: _kodrMockResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _kodrMockConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});