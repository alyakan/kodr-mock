define("kodr-mock/services/auth-manager", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Service.extend({
    accessToken: null,

    authenticate: function authenticate(login, password) {
      var _this = this;

      return _ember["default"].$.ajax({
        method: "POST",
        url: "/token",
        data: { username: login, password: password }
      }).then(function (result) {
        _this.set('accessToken', result.access_token);
      });
    },

    invalidate: function invalidate() {
      this.set('accessToken', null);
    },

    isAuthenticated: _ember["default"].computed.bool('accessToken')

  });
});