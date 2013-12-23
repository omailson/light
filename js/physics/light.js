/**
 * This class represents a source of light
 *
 * @class Light
 * @param pos {Object} Source position
 * @param points {Array} An array of two points. They are the initial points of the light
 */
var Light = function (pos, points) {
    this.pos = pos;
    this.points = points;
    this.rays = [];
};
