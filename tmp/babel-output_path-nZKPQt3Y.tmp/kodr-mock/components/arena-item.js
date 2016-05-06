define('kodr-mock/components/arena-item', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		authManager: _ember['default'].inject.service('session')
	});
});