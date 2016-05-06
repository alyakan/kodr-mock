define('kodr-mock/storages/current-user', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {

  var Storage = _emberLocalStorageLocalObject['default'].extend();

  // Storage.reopenClass({
  //   initialState() {
  //     return {user: null};
  //   }
  // });

  exports['default'] = Storage;
});