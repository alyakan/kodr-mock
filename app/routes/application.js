import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
export default Ember.Route.extend(ApplicationRouteMixin, {
	model() {
		return this.store.findAll('arena');
	},
	authManager: Ember.inject.service('session')
});
