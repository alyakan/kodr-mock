import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
var toastr = window.toastr;
export default Ember.Component.extend({
	authManager: Ember.inject.service('session'),
  token: storageFor('token'),

  actions: {
    authenticate() {
      var that = this;
      const { identification, password } = this.getProperties('identification', 'password');
      // this.get('authManager').authenticate('authenticator:oauth2', identification, password).then((res) => {
      //   console.log(res)
      //   alert('Success! Click the top link!');
      // }, (err) => {
      //   alert('Error obtaining token: ' + err.responseText);
      // });
      // Ember.$.ajax({
      //   type: 'DELETE',
      //   url: '/logout'
      // }).done(function() {

      // })
      Ember.$.ajax({
          type: 'POST',
          url: '/token',
          context: that,
          data: that.getProperties('identification', 'password')
      }).done(function(res) {
        var uid = res.user_id;
        
        that.set('token.key', res.token);
        that.set('token.email', res.email);
        that.set('token.uid', uid);
        console.log("LOL", res.user_email);
      }).fail(function(xhr) {
          that.set('errorMessage', xhr.responseText);
      });
    }
  }
});
