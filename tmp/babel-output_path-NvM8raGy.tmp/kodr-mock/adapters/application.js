define('kodr-mock/adapters/application', ['exports', 'ember-data', 'kodr-mock/config/environment'], function (exports, _emberData, _kodrMockConfigEnvironment) {
		exports['default'] = _emberData['default'].RESTAdapter.extend({
				namespace: 'api',
				coalesceFindRequests: true,
				shouldReloadAll: function shouldReloadAll() {
						return true;
				},
				authManager: Ember.inject.service(),

				headers: Ember.computed('authManager.accessToken', function () {
						return {
								"Authorization": 'Bearer ' + this.get("authManager.accessToken")
						};
				})
		});
});