import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
	namespace: 'api',
	coalesceFindRequests: true,
	shouldReloadAll: function() {
		return true;
	},
	authManager: Ember.inject.service(),

  headers: Ember.computed('authManager.accessToken', function() {
    return {
      "Authorization": `Bearer ${this.get("authManager.accessToken")}`
    };
  })
});
