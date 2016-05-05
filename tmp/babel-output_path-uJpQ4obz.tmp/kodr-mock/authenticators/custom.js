define('kodr-mock/authenticators/custom', ['exports', 'ember', 'simple-auth-oauth2/authenticators/oauth2'], function (exports, _ember, _simpleAuthOauth2AuthenticatorsOauth2) {
    exports['default'] = _simpleAuthOauth2AuthenticatorsOauth2['default'].extend({

        authenticate: function authenticate(credentials) {
            return new _ember['default'].RSVP.Promise(function (resolve, reject) {
                // make the request to authenticate the user at endpoint /v3/token
                _ember['default'].$.ajax({
                    url: '/token',
                    type: 'POST',
                    data: {
                        grant_type: 'password',
                        identification: credentials.identification,
                        password: credentials.password
                    }
                }).then(function (response) {
                    _ember['default'].run(function () {
                        // resolve (including the user id) as the AJAX request was successful; all properties this promise resolves
                        // with will be available through the session
                        resolve({
                            access_token: response.access_token,
                            user_id: response.user_id
                        });
                    });
                }, function (xhr) {
                    _ember['default'].run(function () {
                        reject(xhr.responseText);
                    });
                });
            });
        }
    });
});