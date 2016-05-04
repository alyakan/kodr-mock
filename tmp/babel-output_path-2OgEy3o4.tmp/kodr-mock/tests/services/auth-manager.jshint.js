define('kodr-mock/tests/services/auth-manager.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/auth-manager.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'services/auth-manager.js should pass jshint.\nservices/auth-manager.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/auth-manager.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nservices/auth-manager.js: line 6, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nservices/auth-manager.js: line 11, col 20, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\nservices/auth-manager.js: line 16, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n5 errors');
  });
});