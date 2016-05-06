define('kodr-mock/tests/authorizers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authorizers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'authorizers/application.js should pass jshint.\nauthorizers/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nauthorizers/application.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
  });
});