define('kodr-mock/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'kodr-mock/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _kodrMockConfigEnvironment) {

  var name = _kodrMockConfigEnvironment['default'].APP.name;
  var version = _kodrMockConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});