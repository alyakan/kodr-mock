define('kodr-mock/storages/token', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {

  var Storage = _emberLocalStorageLocalObject['default'].extend();

  // Uncomment if you would like to set initialState
  Storage.reopenClass({
    initialState: function initialState() {
      return {
        key: null,
        email: null,
        uid: null
      };
    }
  });

  exports['default'] = Storage;
});