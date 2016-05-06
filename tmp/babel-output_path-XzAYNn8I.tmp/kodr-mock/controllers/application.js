define('kodr-mock/controllers/application', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
	exports['default'] = _ember['default'].Controller.extend({
		token: (0, _emberLocalStorage.storageFor)('token'),
		current_user: (0, _emberLocalStorage.storageFor)('current_user')
	});
});