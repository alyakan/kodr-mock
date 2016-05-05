define('kodr-mock/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'].extend({

    store: Ember.inject.service(),

    setCurrentUser: (function () {
      var _this = this;

      if (this.get('isAuthenticated')) {
        this.get('store').queryRecord('user', {}).then(function (user) {
          _this.set('currentUser', user);
        });
      }
    }).observes('isAuthenticated')

  });
});