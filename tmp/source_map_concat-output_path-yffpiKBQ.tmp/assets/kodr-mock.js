"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('kodr-mock/adapters/application', ['exports', 'ember-data', 'kodr-mock/config/environment', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _kodrMockConfigEnvironment, _emberSimpleAuthMixinsDataAdapterMixin) {
	exports['default'] = _emberData['default'].RESTAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
		namespace: 'api',
		coalesceFindRequests: true,
		shouldReloadAll: function shouldReloadAll() {
			return true;
		},
		authorizer: 'authorizer:application'
	});
});
define('kodr-mock/app', ['exports', 'ember', 'kodr-mock/resolver', 'ember-load-initializers', 'kodr-mock/config/environment'], function (exports, _ember, _kodrMockResolver, _emberLoadInitializers, _kodrMockConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _kodrMockConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _kodrMockConfigEnvironment['default'].podModulePrefix,
    Resolver: _kodrMockResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _kodrMockConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('kodr-mock/authenticators/custom', ['exports', 'ember', 'simple-auth-oauth2/authenticators/oauth2'], function (exports, _ember, _simpleAuthOauth2AuthenticatorsOauth2) {
    exports['default'] = _simpleAuthOauth2AuthenticatorsOauth2['default'].extend({

        authenticate: function authenticate(credentials) {
            return new _ember['default'].RSVP.Promise(function (resolve, reject) {
                // make the request to authenticate the user at endpoint /v3/token
                _ember['default'].$.ajax({
                    url: '/token',
                    type: 'POST',
                    data: {
                        grant_type: 'password',
                        identification: credentials.identification,
                        password: credentials.password
                    }
                }).then(function (response) {
                    _ember['default'].run(function () {
                        // resolve (including the user id) as the AJAX request was successful; all properties this promise resolves
                        // with will be available through the session
                        resolve({
                            access_token: response.access_token,
                            user_id: response.user_id
                        });
                    });
                }, function (xhr) {
                    _ember['default'].run(function () {
                        reject(xhr.responseText);
                    });
                });
            });
        }
    });
});
define('kodr-mock/authenticators/oauth2', ['exports', 'ember-simple-auth/authenticators/oauth2-password-grant'], function (exports, _emberSimpleAuthAuthenticatorsOauth2PasswordGrant) {
  exports['default'] = _emberSimpleAuthAuthenticatorsOauth2PasswordGrant['default'].extend();
});
define('kodr-mock/authorizers/application', ['exports', 'ember-simple-auth/authorizers/oauth2-bearer'], function (exports, _emberSimpleAuthAuthorizersOauth2Bearer) {
  exports['default'] = _emberSimpleAuthAuthorizersOauth2Bearer['default'].extend();
});
define('kodr-mock/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'kodr-mock/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _kodrMockConfigEnvironment) {

  var name = _kodrMockConfigEnvironment['default'].APP.name;
  var version = _kodrMockConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('kodr-mock/components/arena-item', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Component.extend({
		authManager: _ember['default'].inject.service('session')
	});
});
define('kodr-mock/components/login-page', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  var toastr = window.toastr;
  exports['default'] = _ember['default'].Component.extend({
    authManager: _ember['default'].inject.service('session'),
    token: (0, _emberLocalStorage.storageFor)('token'),

    actions: {
      authenticate: function authenticate() {
        var that = this;

        var _getProperties = this.getProperties('identification', 'password');

        var identification = _getProperties.identification;
        var password = _getProperties.password;

        // this.get('authManager').authenticate('authenticator:oauth2', identification, password).then((res) => {
        //   console.log(res)
        //   alert('Success! Click the top link!');
        // }, (err) => {
        //   alert('Error obtaining token: ' + err.responseText);
        // });
        // Ember.$.ajax({
        //   type: 'DELETE',
        //   url: '/logout'
        // }).done(function() {

        // })
        _ember['default'].$.ajax({
          type: 'POST',
          url: '/token',
          context: that,
          data: that.getProperties('identification', 'password')
        }).done(function (res) {
          var uid = res.user_id;

          that.set('token.key', res.token);
          that.set('token.email', res.email);
          that.set('token.uid', uid);
          console.log("LOL", res.user_email);
        }).fail(function (xhr) {
          that.set('errorMessage', xhr.responseText);
        });
      }
    }
  });
});
define('kodr-mock/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('kodr-mock/controllers/login', ['exports', 'ember-validations', 'ember'], function (exports, _emberValidations, _ember) {
  var toastr = window.toastr;

  var LoginController = _ember['default'].Controller.extend(_emberValidations['default'].Mixin, {
    authenticator: 'simple-auth-authenticator:oauth2-password-grant',
    validations: {
      identification: {
        presence: true,
        length: {
          minimum: 4
        }
      },
      password: {
        presence: true,
        length: {
          minimum: 8
        }
      }
    },
    actions: {
      validate: function validate() {

        var that = this;
        return this.validate().then(function () {
          that.send('authenticate');
        }, function () {
          var errors = that.get('errors');
          var fullErrors = [];
          Object.keys(errors).forEach(function (val) {
            if (errors[val] instanceof Array) {
              errors[val].forEach(function (msg) {
                fullErrors.push([val, msg].join(" "));
              });
            }
          });
          that.set('fullErrors', fullErrors);
        });
      },
      authenticate: function authenticate() {
        var that = this;
        var credentials = that.getProperties('identification', 'password');
        that.get('session').authenticate('authenticator:custom', credentials).then(function () {
          that.transitionToRoute('userArenas');
        }, function (error) {
          that.set('errorMessage', JSON.parse(error));
        });
      },
      verify: function verify(uid) {
        var that = this;
        _ember['default'].$.post('api/users/' + uid + '/verify').done(function (res) {
          toastr.success(res.message);
          that.set('fullErrors', '');
        }).fail(function (xhr) {
          console.log(xhr);
          toastr.error(xhr);
        });
      }
    }
  });

  exports['default'] = LoginController;
});
// import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
define('kodr-mock/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('kodr-mock/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('kodr-mock/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('kodr-mock/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'kodr-mock/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _kodrMockConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_kodrMockConfigEnvironment['default'].APP.name, _kodrMockConfigEnvironment['default'].APP.version)
  };
});
define('kodr-mock/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('kodr-mock/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('kodr-mock/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('kodr-mock/initializers/ember-simple-auth', ['exports', 'ember', 'kodr-mock/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _kodrMockConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _kodrMockConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _kodrMockConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('kodr-mock/initializers/export-application-global', ['exports', 'ember', 'kodr-mock/config/environment'], function (exports, _ember, _kodrMockConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_kodrMockConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _kodrMockConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_kodrMockConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('kodr-mock/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('kodr-mock/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('kodr-mock/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('kodr-mock/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("kodr-mock/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('kodr-mock/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('kodr-mock/mixins/serializable', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Mixin.create({
        serialize: function serialize() {
            var propertyNames = this.get('propertyNames') || [];
            return this.getProperties(propertyNames);
        },

        deserialize: function deserialize(hash) {
            this.setProperties(hash);
        }
    });
});
define('kodr-mock/models/arena', ['exports', 'ember-data/model', 'ember-data/attr', 'ember-data'], function (exports, _emberDataModel, _emberDataAttr, _emberData) {
  exports['default'] = _emberDataModel['default'].extend({
    name: (0, _emberDataAttr['default'])('string'),
    description: (0, _emberDataAttr['default'])('string'),
    isPublished: (0, _emberDataAttr['default'])('boolean')
  });
});
// challenges: DS.hasMany('challenge', {async:true, inverse: 'arena'}),
define('kodr-mock/models/user', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  exports['default'] = _emberDataModel['default'].extend({
    email: (0, _emberDataAttr['default'])('string')
  });
});
define('kodr-mock/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('kodr-mock/router', ['exports', 'ember', 'kodr-mock/config/environment'], function (exports, _ember, _kodrMockConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _kodrMockConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('login');
  });

  exports['default'] = Router;
});
define('kodr-mock/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {
		model: function model() {
			return this.store.findAll('arena');
		}
	});
});
define('kodr-mock/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('kodr-mock/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {

    var ApplicationSerializer = _emberData['default'].RESTSerializer.extend({
        primaryKey: '_id'
    });

    exports['default'] = ApplicationSerializer;
});
define('kodr-mock/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('kodr-mock/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'].extend({

    store: Ember.inject.service(),

    setCurrentUser: (function () {
      var _this = this;

      if (this.get('isAuthenticated')) {
        this.get('store').queryRecord('user', {}).then(function (user) {
          _this.set('currentUser', user);
        });
      }
    }).observes('isAuthenticated')

  });
});
define('kodr-mock/services/validations', ['exports', 'ember'], function (exports, _ember) {

  var set = _ember['default'].set;

  exports['default'] = _ember['default'].Service.extend({
    init: function init() {
      set(this, 'cache', {});
    }
  });
});
define('kodr-mock/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define('kodr-mock/sessions/custom', ['exports', 'simple-auth/session', 'ember', 'ember-data'], function (exports, _simpleAuthSession, _ember, _emberData) {
    exports['default'] = _simpleAuthSession['default'].extend({
        user: (function () {
            var userId = this.get('secure.user_id');
            if (!_ember['default'].isEmpty(userId)) {
                return _emberData['default'].PromiseObject.create({
                    promise: this.container.lookup('service:store').findRecord('user', userId)
                });
            }
        }).property('secure.user_id'),
        atLeastTeacher: (function () {
            return this.get('isAdmin') || this.get('isTeacher');
        }).property('user.role'),
        isAdmin: (function () {
            return this.get('user.isAdmin');
        }).property('user.role'),
        isTeacher: (function () {
            return this.get('user.isTeacher');
        }).property('user.role'),
        isStudent: (function () {
            return this.get('user.isStudent');
        }).property('user.role')
    });
});
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
define("kodr-mock/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 4
            },
            "end": {
              "line": 34,
              "column": 4
            }
          },
          "moduleName": "kodr-mock/templates/application.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "arena-item", [], ["arena", ["subexpr", "@mut", [["get", "arena", ["loc", [null, [33, 24], [33, 29]]]]], [], []]], ["loc", [null, [33, 5], [33, 31]]]]],
        locals: ["arena"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 42,
            "column": 0
          }
        },
        "moduleName": "kodr-mock/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "class", "navbar navbar-inverse navbar-fixed-top");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container-fluid");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "navbar-header");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "navbar-brand");
        dom.setAttribute(el4, "href", "#");
        var el5 = dom.createTextNode("Kodr");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("ul");
        dom.setAttribute(el3, "class", "nav navbar-nav");
        var el4 = dom.createTextNode("\n    	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#");
        var el6 = dom.createTextNode("Arenas");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("li");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5, "href", "#");
        var el6 = dom.createTextNode("Login");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Welcome to Kodr");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "page-header");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Arenas");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-md-8 col-md-offset-2");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "list-group");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 3, 3);
        morphs[1] = dom.createMorphAt(element0, 5, 5);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [9, 1, 1]), 1, 1);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [24, 3], [24, 13]]]], ["content", "login-page", ["loc", [null, [25, 4], [25, 18]]]], ["block", "each", [["get", "model", ["loc", [null, [32, 12], [32, 17]]]]], [], 0, null, ["loc", [null, [32, 4], [34, 13]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("kodr-mock/templates/components/arena-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 0
          }
        },
        "moduleName": "kodr-mock/templates/components/arena-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("style");
        dom.setAttribute(el1, "type", "text/css");
        var el2 = dom.createTextNode("\n	.wrap {\n		height: 100%;\n	}\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "href", "#");
        dom.setAttribute(el1, "class", "list-group-item");
        var el2 = dom.createTextNode("\n\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "pull-right");
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-primary btn-xs");
        dom.setAttribute(el3, "type", "button");
        var el4 = dom.createTextNode("\n	");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "fa fa-play");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Enter\n	");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "progress");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "progress-bar progress-bar-success");
        dom.setAttribute(el3, "role", "progressbar");
        dom.setAttribute(el3, "aria-valuenow", "70");
        dom.setAttribute(el3, "aria-valuemin", "0");
        dom.setAttribute(el3, "aria-valuemax", "100");
        dom.setAttribute(el3, "style", "width:70%");
        var el4 = dom.createTextNode("\n    70%\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [3]), 3, 3);
        morphs[1] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        return morphs;
      },
      statements: [["content", "arena.name", ["loc", [null, [13, 0], [13, 14]]]], ["content", "yield", ["loc", [null, [24, 0], [24, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("kodr-mock/templates/components/login-page", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 3
            },
            "end": {
              "line": 4,
              "column": 1
            }
          },
          "moduleName": "kodr-mock/templates/components/login-page.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("	  Logged in as ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "token.email", ["loc", [null, [3, 16], [3, 31]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 1
            },
            "end": {
              "line": 13,
              "column": 1
            }
          },
          "moduleName": "kodr-mock/templates/components/login-page.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "page-header");
          var el2 = dom.createTextNode("\n		    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          var el3 = dom.createTextNode("Sign in");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n		");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          dom.setAttribute(el1, "class", "form-group");
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n			");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "type", "submit");
          dom.setAttribute(el2, "class", "btn btn-primary btn-block");
          dom.setAttribute(el2, "type", "submit");
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-unlock-alt");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(" Login");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n		");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [3]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 4, 4);
          return morphs;
        },
        statements: [["element", "action", ["authenticate"], ["on", "submit"], ["loc", [null, [8, 27], [8, 64]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "identification", ["loc", [null, [9, 17], [9, 31]]]]], [], []], "class", "form-control", "placeholder", "Login"], ["loc", [null, [9, 3], [9, 74]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [10, 17], [10, 25]]]]], [], []], "class", "form-control", "placeholder", "Password", "type", "password"], ["loc", [null, [10, 3], [10, 87]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 0
          }
        },
        "moduleName": "kodr-mock/templates/components/login-page.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("  \n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(element1, 3, 3);
        return morphs;
      },
      statements: [["block", "if", [["get", "token.key", ["loc", [null, [2, 9], [2, 18]]]]], [], 0, 1, ["loc", [null, [2, 3], [13, 8]]]], ["content", "yield", ["loc", [null, [16, 0], [16, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("kodr-mock/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 6
              },
              "end": {
                "line": 13,
                "column": 6
              }
            },
            "moduleName": "kodr-mock/templates/login.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        if you still did not recieve any email in you inbox we can ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            dom.setAttribute(el1, "href", "#verify");
            var el2 = dom.createTextNode("resend verifcation to ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createElementMorph(element0);
            morphs[1] = dom.createMorphAt(element0, 1, 1);
            return morphs;
          },
          statements: [["element", "action", ["verify", ["get", "errorMessage.id", ["loc", [null, [12, 88], [12, 103]]]]], [], ["loc", [null, [12, 70], [12, 106]]]], ["content", "errorMessage.email", ["loc", [null, [12, 144], [12, 166]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 4
            },
            "end": {
              "line": 15,
              "column": 4
            }
          },
          "moduleName": "kodr-mock/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert alert-danger");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element1, 1, 1);
          morphs[1] = dom.createMorphAt(element1, 3, 3);
          return morphs;
        },
        statements: [["content", "errorMessage.message", ["loc", [null, [10, 6], [10, 30]]]], ["block", "if", [["get", "errorMessage.id", ["loc", [null, [11, 12], [11, 27]]]]], [], 0, null, ["loc", [null, [11, 6], [13, 13]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.2",
            "loc": {
              "source": null,
              "start": {
                "line": 18,
                "column": 8
              },
              "end": {
                "line": 20,
                "column": 8
              }
            },
            "moduleName": "kodr-mock/templates/login.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "message", ["loc", [null, [19, 13], [19, 24]]]]],
          locals: ["message"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.2",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 4
            },
            "end": {
              "line": 22,
              "column": 4
            }
          },
          "moduleName": "kodr-mock/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert alert-danger");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "fullErrors", ["loc", [null, [18, 16], [18, 26]]]]], [], 0, null, ["loc", [null, [18, 8], [20, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 44,
            "column": 0
          }
        },
        "moduleName": "kodr-mock/templates/login.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "page-header");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode("Sign in");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-sm-8 col-sm-offset-2");
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "form-group text-center");
        var el5 = dom.createTextNode("\n        \n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "form-group");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "identification");
        dom.setAttribute(el5, "class", "control-label");
        var el6 = dom.createTextNode("Username or Email");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "form-group");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        dom.setAttribute(el5, "for", "password");
        dom.setAttribute(el5, "class", "control-label");
        var el6 = dom.createTextNode("Password");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "class", "submit btn btn-primary");
        var el5 = dom.createElement("i");
        dom.setAttribute(el5, "class", "fa fa-unlock-alt");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" Sign in");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      \n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      \n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0, 3]);
        var element3 = dom.childAt(element2, [4]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(element2, 1, 1);
        morphs[1] = dom.createMorphAt(element2, 2, 2);
        morphs[2] = dom.createElementMorph(element3);
        morphs[3] = dom.createMorphAt(dom.childAt(element3, [3]), 3, 3);
        morphs[4] = dom.createMorphAt(dom.childAt(element3, [5]), 3, 3);
        morphs[5] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["block", "if", [["get", "errorMessage", ["loc", [null, [8, 10], [8, 22]]]]], [], 0, null, ["loc", [null, [8, 4], [15, 11]]]], ["block", "if", [["get", "fullErrors", ["loc", [null, [16, 10], [16, 20]]]]], [], 1, null, ["loc", [null, [16, 4], [22, 11]]]], ["element", "action", ["validate"], ["on", "submit"], ["loc", [null, [24, 10], [24, 43]]]], ["inline", "input", [], ["type", "text", "class", "form-control", "id", "identification", "value", ["subexpr", "@mut", [["get", "identification", ["loc", [null, [30, 75], [30, 89]]]]], [], []], "autofocus", "autofocus"], ["loc", [null, [30, 8], [30, 113]]]], ["inline", "input", [], ["type", "password", "class", "form-control", "id", "password", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [34, 73], [34, 81]]]]], [], []]], ["loc", [null, [34, 8], [34, 83]]]], ["content", "outlet", ["loc", [null, [43, 0], [43, 10]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('kodr-mock/config/environment', ['ember'], function(Ember) {
  var prefix = 'kodr-mock';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("kodr-mock/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_TRANSITIONS":true,"LOG_TRANSITIONS_INTERNAL":true,"name":"kodr-mock","version":"0.0.0+3589d267"});
}

/* jshint ignore:end */
//# sourceMappingURL=kodr-mock.map