define('kodr-mock/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'kodr-mock/tests/helpers/start-app', 'kodr-mock/tests/helpers/destroy-app'], function (exports, _qunit, _kodrMockTestsHelpersStartApp, _kodrMockTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _kodrMockTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _kodrMockTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});