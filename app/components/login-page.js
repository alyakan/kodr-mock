import Ember from 'ember';

export default Ember.Component.extend({
	authManager: Ember.inject.service('session'),

	 actions: {
    authenticate() {
      const { identification, password } = this.getProperties('identification', 'password');
      this.get('authManager').authenticate('authenticator:oauth2', identification, password).then(() => {
        alert('Success! Click the top link!');
      }, (err) => {
        alert('Error obtaining token: ' + err.responseText);
      });
    }
  }
});
