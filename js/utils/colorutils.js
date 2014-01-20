/**
 * Color utilities
 *
 * @class ColorUtils
 * @static
 * @constructor
 */
var ColorUtils = {};

/**
 * Given 2 colors (each represented as a 4-element array), return the resulting
 * composition. The composition is such that if the 3 main components (red,
 * green and blue) are blended togegher, the resulting color is white.
 *
 * @method mix
 * @param c1 {Array} A RGBA color
 * @param c2 {Array} Another RGBA color
 * @return {Array} resulting color
 */
ColorUtils.mix = function (c1, c2) {
    var r = c1[0] + c2[0];
    var g = c1[1] + c2[1];
    var b = c1[2] + c2[2];

    var max = Math.max(r, g, b);
    if (max > 255) {
        r = Math.floor(r / max * 255);
        g = Math.floor(g / max * 255);
        b = Math.floor(b / max * 255);
    }

    return [r, g, b];
};
