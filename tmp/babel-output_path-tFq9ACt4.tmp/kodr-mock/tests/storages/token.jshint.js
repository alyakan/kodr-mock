define('kodr-mock/tests/storages/token.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - storages/token.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'storages/token.js should pass jshint.\nstorages/token.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nstorages/token.js: line 3, col 1, \'const\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nstorages/token.js: line 7, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\nstorages/token.js: line 16, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\n\n4 errors');
  });
});