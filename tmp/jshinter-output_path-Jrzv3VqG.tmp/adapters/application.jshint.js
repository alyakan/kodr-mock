QUnit.module('JSHint - adapters/application.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 2, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 4, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nadapters/application.js: line 14, col 24, \'template literal syntax\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
});
