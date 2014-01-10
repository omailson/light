/**
 * Give access to page's DOM elements
 *
 * Use DOMTree.get(R.MyElement) to correctly get the element
 *
 * The resource object can store a HTMLElement itself or a function which
 * returns an HTMLElement as shown in the example below
 *
 *     var R = {
 *         MyElement: document.getElementById("myelement"),
 *         MyOtherElement: {
 *             root: document.getElementById("myotherelement"),
 *             SubElement: document.getElementById("subelement")
 *         },
 *         MyLazyElement: function () { return document.getElementById("lazyelement"); }
 *     };
 *
 *     // Each of these elements can be accessed via
 *     DOMTree.get(R.MyElement1);
 *     DOMTree.get(R.MyOtherElement);
 *     DOMTree.get(R.MyOtherElement.SubElement1);
 *     DOMTree.get(R.MyLazyElement);
 *
 * @class DOMTree
 * @static
 */
var DOMTree = {};

/**
 * Given a resource id, return the resource itself
 *
 * @method get
 * @param id {Object} Resource id
 * @return {HTMLElement}
 * @static
 */
DOMTree.get = function (id) {
    if (!id)
        return null;

    if (id.toString() === "[object Object]")
        return DOMTree.get(id.root);

    if (typeof(id) === "function")
        return id();

    return id;
};
