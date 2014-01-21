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
 * @static
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

/**
 * This method computes the perceived brightness of the color taking into
 * account how each of the RGB components affects the human eye
 *
 * This method is based on the HSP color model by Darel Rex Finley[1]. The
 * reason to choose this model is better explained in this other article[2].
 *
 * [1] http://alienryderflex.com/hsp.html
 * [2] http://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
 *
 * @method brightness
 * @param {Array} An array with the 3 RGB components (0-255)
 * @return {Number} The perceived brightness of the color (0-1)
 * @static
 */
ColorUtils.brightness = function (color) {
    var p = Math.sqrt(0.241 * Math.pow(color[0], 2) +
            0.691 * Math.pow(color[1], 2) +
            0.068 * Math.pow(color[2], 2));

    return p / 255;
};
