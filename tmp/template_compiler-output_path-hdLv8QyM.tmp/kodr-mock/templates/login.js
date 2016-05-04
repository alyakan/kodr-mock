export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
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
          dom.setAttribute(el1,"href","#verify");
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
          morphs[1] = dom.createMorphAt(element0,1,1);
          return morphs;
        },
        statements: [
          ["element","action",["verify",["get","errorMessage.id",["loc",[null,[12,88],[12,103]]]]],[],["loc",[null,[12,70],[12,106]]]],
          ["content","errorMessage.email",["loc",[null,[12,144],[12,166]]]]
        ],
        locals: [],
        templates: []
      };
    }());
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
        dom.setAttribute(el1,"class","alert alert-danger");
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
        morphs[0] = dom.createMorphAt(element1,1,1);
        morphs[1] = dom.createMorphAt(element1,3,3);
        return morphs;
      },
      statements: [
        ["content","errorMessage.message",["loc",[null,[10,6],[10,30]]]],
        ["block","if",[["get","errorMessage.id",["loc",[null,[11,12],[11,27]]]]],[],0,null,["loc",[null,[11,6],[13,13]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child1 = (function() {
    var child0 = (function() {
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
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          return morphs;
        },
        statements: [
          ["content","message",["loc",[null,[19,13],[19,24]]]]
        ],
        locals: ["message"],
        templates: []
      };
    }());
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
        dom.setAttribute(el1,"class","alert alert-danger");
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
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
        return morphs;
      },
      statements: [
        ["block","each",[["get","fullErrors",["loc",[null,[18,16],[18,26]]]]],[],0,null,["loc",[null,[18,8],[20,17]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  return {
    meta: {
      "fragmentReason": {
        "name": "missing-wrapper",
        "problems": [
          "multiple-nodes",
          "wrong-type"
        ]
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
      dom.setAttribute(el1,"class","container");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","page-header");
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
      dom.setAttribute(el2,"class","col-sm-8 col-sm-offset-2");
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
      dom.setAttribute(el4,"class","form-group text-center");
      var el5 = dom.createTextNode("\n        \n      ");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","form-group");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("label");
      dom.setAttribute(el5,"for","identification");
      dom.setAttribute(el5,"class","control-label");
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
      dom.setAttribute(el4,"class","form-group");
      var el5 = dom.createTextNode("\n        ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("label");
      dom.setAttribute(el5,"for","password");
      dom.setAttribute(el5,"class","control-label");
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
      dom.setAttribute(el4,"type","submit");
      dom.setAttribute(el4,"class","submit btn btn-primary");
      var el5 = dom.createElement("i");
      dom.setAttribute(el5,"class","fa fa-unlock-alt");
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
      morphs[0] = dom.createMorphAt(element2,1,1);
      morphs[1] = dom.createMorphAt(element2,2,2);
      morphs[2] = dom.createElementMorph(element3);
      morphs[3] = dom.createMorphAt(dom.childAt(element3, [3]),3,3);
      morphs[4] = dom.createMorphAt(dom.childAt(element3, [5]),3,3);
      morphs[5] = dom.createMorphAt(fragment,2,2,contextualElement);
      return morphs;
    },
    statements: [
      ["block","if",[["get","errorMessage",["loc",[null,[8,10],[8,22]]]]],[],0,null,["loc",[null,[8,4],[15,11]]]],
      ["block","if",[["get","fullErrors",["loc",[null,[16,10],[16,20]]]]],[],1,null,["loc",[null,[16,4],[22,11]]]],
      ["element","action",["validate"],["on","submit"],["loc",[null,[24,10],[24,43]]]],
      ["inline","input",[],["type","text","class","form-control","id","identification","value",["subexpr","@mut",[["get","identification",["loc",[null,[30,75],[30,89]]]]],[],[]],"autofocus","autofocus"],["loc",[null,[30,8],[30,113]]]],
      ["inline","input",[],["type","password","class","form-control","id","password","value",["subexpr","@mut",[["get","password",["loc",[null,[34,73],[34,81]]]]],[],[]]],["loc",[null,[34,8],[34,83]]]],
      ["content","outlet",["loc",[null,[43,0],[43,10]]]]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));