QUnit.module('JSHint - components/login-page.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/login-page.js should pass jshint.\ncomponents/login-page.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/login-page.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\ncomponents/login-page.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\ncomponents/login-page.js: line 9, col 5, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/login-page.js: line 11, col 7, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\ncomponents/login-page.js: line 11, col 7, \'destructuring binding\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n6 errors');
});
