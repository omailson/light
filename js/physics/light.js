/**
 * This class represents a source of light
 *
 * @class Light
 * @param pos {Object} Source position
 * @param points {Array} An array of two points. They are the initial points of the light
 * @param color {String} The color of the light
 */
var Light = function (pos, points, color) {
    this.world = null;

    this.pos = pos;
    this.color = color;
    this.points = points;
    this.rays = [];
};

/**
 * Paints the light into a context
 *
 * @method paint
 * @param context {CanvasRenderingContext2D} A canvas context 2D
 */
Light.prototype.paint = function (context, rays) {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.pos.x, this.pos.y);
    for (var i = 0; i < rays.data.length; i++) {
        if (!rays.data[i].isFinite()) // XXX
            rays.data[i].p2 = this.world.intersectionPoint(rays.data[i]);

        context.lineTo(rays.data[i].oriented().p1.x, rays.data[i].oriented().p1.y);
        context.lineTo(rays.data[i].oriented().p2.x, rays.data[i].oriented().p2.y);
    }
    context.fill();
};
