define('kodr-mock/components/login-page', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  var toastr = window.toastr;
  exports['default'] = _ember['default'].Component.extend({
    authManager: _ember['default'].inject.service('session'),
    token: (0, _emberLocalStorage.storageFor)('token'),

    actions: {
      authenticate: function authenticate() {
        var that = this;

        var _getProperties = this.getProperties('identification', 'password');

        var identification = _getProperties.identification;
        var password = _getProperties.password;

        // this.get('authManager').authenticate('authenticator:oauth2', identification, password).then((res) => {
        //   console.log(res)
        //   alert('Success! Click the top link!');
        // }, (err) => {
        //   alert('Error obtaining token: ' + err.responseText);
        // });
        // Ember.$.ajax({
        //   type: 'DELETE',
        //   url: '/logout'
        // }).done(function() {

        // })
        _ember['default'].$.ajax({
          type: 'POST',
          url: '/token',
          context: that,
          data: that.getProperties('identification', 'password')
        }).done(function (res) {
          var uid = res.user_id;

          that.set('token.key', res.token);
          that.set('token.email', res.email);
          that.set('token.uid', uid);
          console.log("LOL", res.user_email);
        }).fail(function (xhr) {
          that.set('errorMessage', xhr.responseText);
        });
      }
    }
  });
});