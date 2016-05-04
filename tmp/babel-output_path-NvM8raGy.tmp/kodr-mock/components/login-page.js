define('kodr-mock/components/login-page', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		authManager: _ember['default'].inject.service(),

		actions: {
			authenticate: function authenticate() {
				var _getProperties = this.getProperties('login', 'password');

				var login = _getProperties.login;
				var password = _getProperties.password;

				this.get('authManager').authenticate(login, password).then(function () {
					alert('Success! Click the top link!');
				}, function (err) {
					alert('Error obtaining token: ' + err.responseText);
				});
			}
		}
	});
});