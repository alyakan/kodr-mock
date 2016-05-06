QUnit.module('JSHint - services/session.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'services/session.js should pass jshint.\nservices/session.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nservices/session.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nservices/session.js: line 9, col 59, \'arrow function syntax (=>)\' is only available in ES6 (use \'esversion: 6\').\n\n3 errors');
});
