/*jshint unused:false */

/**
 * Check the inheritance chain of the object constructor, in order to
 * see if it inherits from the class constructor passed as parameter
 *
 * @private
 * @param objectCtor {Function} The constructor function of the object to be checked
 * @param classCtor {Function} Constructor function to check inheritance against
 * @return {Boolean} indicating whether inherits or not
 */
var _checkInheritanceChain = function (objectCtor, classCtor) {
    if (objectCtor === classCtor)
        return true;

    if (!objectCtor.meta)
        return false;

    var inheritsFrom = objectCtor.meta.inheritsFrom;
    var inherits = false;
    for (var i = 0; i < inheritsFrom.length && !inherits; i++)
        inherits = (inheritsFrom[i] === classCtor) || _checkInheritanceChain(inheritsFrom[i], classCtor);

    return inherits;
};

/**
 * Check if object is instance of given class.
 *
 * @param object {Object} The object
 * @param classCtor {Function} Constructor function to check inheritance against
 * @return {Boolean} indicating success of comparison
 */
var isInstanceOf = function (object, classCtor) {
    if (!object.constructor.meta || classCtor === Object)
        return (object instanceof classCtor); // use standard inheritance test

    return _checkInheritanceChain(object.constructor, classCtor);
};

/**
 * Applies inheritance between two classes.
 *
 * The use of this function to perform the inheritance will break the
 * instanceof  * operator. Use the isInstanceOf() function instead.
 *
 * @param target {Function} the target class
 * @param source {Function} the source class
 */
var inherits = function (target, source) {
    // check for inheritance metadata in the this class
    if (!target.meta) {
        target.meta = {
            inheritsFrom: []
        };
    }

    // add the this class in the inheritance metadata of the this class
    target.meta.inheritsFrom.push(source);

    for (var property in source.prototype) {
        if (target.prototype.hasOwnProperty(property))
            continue;

        // copy missing property from the parent class to the this class
        target.prototype[property] = source.prototype[property];
    }
};

/**
 * Performs a deep copy of an object
 *
 * Retrieve from: http://stackoverflow.com/a/728694/556192
 *
 * @param obj {Object} the object to be cloned
 * @return {Object} a copy of the object
 */
var deepCopy = function (obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
