define('kodr-mock/router', ['exports', 'ember', 'kodr-mock/config/environment'], function (exports, _ember, _kodrMockConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _kodrMockConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('login');
  });

  exports['default'] = Router;
});