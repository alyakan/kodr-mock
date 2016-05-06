import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
export default Ember.Controller.extend({
	token: storageFor('token'),
	current_user: storageFor('current_user')
});
