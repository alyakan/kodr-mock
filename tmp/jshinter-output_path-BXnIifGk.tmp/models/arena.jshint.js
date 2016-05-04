QUnit.module('JSHint - models/arena.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'models/arena.js should pass jshint.\nmodels/arena.js: line 3, col 8, \'DS\' is defined but never used.\n\n1 error');
});
