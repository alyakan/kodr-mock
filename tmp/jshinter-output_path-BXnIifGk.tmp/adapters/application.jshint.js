QUnit.module('JSHint - adapters/application.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 10, col 18, \'Ember\' is not defined.\nadapters/application.js: line 12, col 12, \'Ember\' is not defined.\nadapters/application.js: line 2, col 8, \'config\' is defined but never used.\n\n3 errors');
});
