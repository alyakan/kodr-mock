QUnit.module('JSHint - routes/user-arenas.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'routes/user-arenas.js should pass jshint.\nroutes/user-arenas.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/user-arenas.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
