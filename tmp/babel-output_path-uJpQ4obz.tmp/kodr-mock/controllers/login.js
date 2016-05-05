define('kodr-mock/controllers/login', ['exports', 'ember-validations', 'ember'], function (exports, _emberValidations, _ember) {
  var toastr = window.toastr;

  var LoginController = _ember['default'].Controller.extend(_emberValidations['default'].Mixin, {
    authenticator: 'simple-auth-authenticator:oauth2-password-grant',
    validations: {
      identification: {
        presence: true,
        length: {
          minimum: 4
        }
      },
      password: {
        presence: true,
        length: {
          minimum: 8
        }
      }
    },
    actions: {
      validate: function validate() {

        var that = this;
        return this.validate().then(function () {
          that.send('authenticate');
        }, function () {
          var errors = that.get('errors');
          var fullErrors = [];
          Object.keys(errors).forEach(function (val) {
            if (errors[val] instanceof Array) {
              errors[val].forEach(function (msg) {
                fullErrors.push([val, msg].join(" "));
              });
            }
          });
          that.set('fullErrors', fullErrors);
        });
      },
      authenticate: function authenticate() {
        var that = this;
        var credentials = that.getProperties('identification', 'password');
        that.get('session').authenticate('authenticator:custom', credentials).then(function () {
          that.transitionToRoute('userArenas');
        }, function (error) {
          that.set('errorMessage', JSON.parse(error));
        });
      },
      verify: function verify(uid) {
        var that = this;
        _ember['default'].$.post('api/users/' + uid + '/verify').done(function (res) {
          toastr.success(res.message);
          that.set('fullErrors', '');
        }).fail(function (xhr) {
          console.log(xhr);
          toastr.error(xhr);
        });
      }
    }
  });

  exports['default'] = LoginController;
});
// import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';