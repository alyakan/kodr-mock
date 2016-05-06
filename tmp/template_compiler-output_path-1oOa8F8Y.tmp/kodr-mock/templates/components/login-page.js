export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
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
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        return morphs;
      },
      statements: [
        ["content","token.email",["loc",[null,[3,16],[3,31]]]]
      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
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
        dom.setAttribute(el1,"class","page-header");
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
        dom.setAttribute(el1,"class","form-group");
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
        dom.setAttribute(el2,"type","submit");
        dom.setAttribute(el2,"class","btn btn-primary btn-block");
        dom.setAttribute(el2,"type","submit");
        var el3 = dom.createElement("i");
        dom.setAttribute(el3,"class","fa fa-unlock-alt");
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
        morphs[1] = dom.createMorphAt(element0,1,1);
        morphs[2] = dom.createMorphAt(element0,4,4);
        return morphs;
      },
      statements: [
        ["element","action",["authenticate"],["on","submit"],["loc",[null,[8,27],[8,64]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","identification",["loc",[null,[9,17],[9,31]]]]],[],[]],"class","form-control","placeholder","Login"],["loc",[null,[9,3],[9,74]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","password",["loc",[null,[10,17],[10,25]]]]],[],[]],"class","form-control","placeholder","Password","type","password"],["loc",[null,[10,3],[10,87]]]]
      ],
      locals: [],
      templates: []
    };
  }());
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
      dom.setAttribute(el1,"class","container");
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
      morphs[0] = dom.createMorphAt(element1,1,1);
      morphs[1] = dom.createMorphAt(element1,3,3);
      return morphs;
    },
    statements: [
      ["block","if",[["get","token.key",["loc",[null,[2,9],[2,18]]]]],[],0,1,["loc",[null,[2,3],[13,8]]]],
      ["content","yield",["loc",[null,[16,0],[16,9]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));