/**
 * String utilities
 *
 * @class StringUtils
 * @module utils
 */
var StringUtils = {};

/**
 * Adds a string to a set of strings
 *
 * One string represents a set of strings divided by spaces.
 * The second string is added to the set if it isn't already
 * present.
 *
 * @method addStringToSet
 * @param stringSet {String} The set of strings
 * @param str {String} The string to be added
 * @param separator {String} The string that separates the elements in the set
 * @return {String} The set of strings with the added string
 * @static
 */
StringUtils.addStringToSet = function (stringSet, str, separator) {
    separator = separator || " ";

    var stringArray = stringSet.split(separator);

    if (stringArray.indexOf(str) !== -1)
        return stringSet;

    if (stringSet !== "")
        stringSet += separator;

    return stringSet + str;
};

/**
 * Removes a string from a set of strings
 *
 * One string represents a set of strings divided by spaces.
 * The second string is removed from the set if it is present.
 *
 * @method removeStringFromSet
 * @param stringSet {String} The set of strings
 * @param str {String} The string to be removed
 * @param separator {String} The string that separates the elements in the set
 * @return {String} The set of strings without the removed string
 * @static
 */
StringUtils.removeStringFromSet = function (stringSet, str, separator) {
    separator = separator || " ";

    var stringArray = stringSet.split(separator);

    if (stringArray.indexOf(str) === -1)
        return stringSet;

    stringArray.splice(stringArray.indexOf(str), 1);
    return stringArray.join(separator);
};
