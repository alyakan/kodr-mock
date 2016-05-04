define('kodr-mock/tests/services/auth-manager.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - services/auth-manager.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/auth-manager.js should pass jshint.');
  });
});