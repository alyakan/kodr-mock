QUnit.module('JSHint - controllers/login.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/login.js: line 3, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncontrollers/login.js: line 63, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
});
