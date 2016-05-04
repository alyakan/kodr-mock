define('kodr-mock/tests/test-helper', ['exports', 'kodr-mock/tests/helpers/resolver', 'ember-qunit'], function (exports, _kodrMockTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_kodrMockTestsHelpersResolver['default']);
});