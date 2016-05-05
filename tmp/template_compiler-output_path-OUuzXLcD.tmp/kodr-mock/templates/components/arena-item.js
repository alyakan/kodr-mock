export default Ember.HTMLBars.template((function() {
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
          "line": 18,
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
      dom.setAttribute(el1,"type","text/css");
      var el2 = dom.createTextNode("\n	.wrap {\n		height: 100%;\n	}\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("a");
      dom.setAttribute(el1,"href","#");
      dom.setAttribute(el1,"class","list-group-item");
      var el2 = dom.createTextNode("\n\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("span");
      dom.setAttribute(el2,"class","pull-right");
      var el3 = dom.createElement("button");
      dom.setAttribute(el3,"class","btn btn-primary btn-xs");
      dom.setAttribute(el3,"type","button");
      var el4 = dom.createTextNode("\n	");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("i");
      dom.setAttribute(el4,"class","fa fa-play");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode(" Enter\n	");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(2);
      morphs[0] = dom.createMorphAt(dom.childAt(fragment, [3]),3,3);
      morphs[1] = dom.createMorphAt(fragment,5,5,contextualElement);
      return morphs;
    },
    statements: [
      ["content","arena.name",["loc",[null,[13,0],[13,14]]]],
      ["content","yield",["loc",[null,[17,0],[17,9]]]]
    ],
    locals: [],
    templates: []
  };
}()));