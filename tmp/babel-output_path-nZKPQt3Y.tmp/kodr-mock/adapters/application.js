define('kodr-mock/adapters/application', ['exports', 'ember-data', 'kodr-mock/config/environment', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _kodrMockConfigEnvironment, _emberSimpleAuthMixinsDataAdapterMixin) {
	exports['default'] = _emberData['default'].RESTAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
		namespace: 'api',
		coalesceFindRequests: true,
		shouldReloadAll: function shouldReloadAll() {
			return true;
		},
		authorizer: 'authorizer:application'
	});
});