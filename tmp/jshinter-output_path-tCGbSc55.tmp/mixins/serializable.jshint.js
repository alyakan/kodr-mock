QUnit.module('JSHint - mixins/serializable.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'mixins/serializable.js should pass jshint.\nmixins/serializable.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nmixins/serializable.js: line 3, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n2 errors');
});
