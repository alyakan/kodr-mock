define('kodr-mock/tests/helpers/start-app', ['exports', 'ember', 'kodr-mock/app', 'kodr-mock/config/environment'], function (exports, _ember, _kodrMockApp, _kodrMockConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _kodrMockConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _kodrMockApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});