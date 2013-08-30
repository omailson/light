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
        context.lineTo(rays.data[i].oriented().p1.x, rays.data[i].oriented().p1.y);
        context.lineTo(rays.data[i].oriented().p2.x, rays.data[i].oriented().p2.y);
    }
    context.fill();
};

/**
 * Recalculate the collection of rays. It looks for the objects in the world
 *
 * @method computeRays
 * @return {RayCollection}
 */
Light.prototype.computeRays = function () {
    var startRay = this.world.createFiniteRay(this.pos, Vector2D.fromPoints(this.pos, this.points[0]));
    var endRay = this.world.createFiniteRay(this.pos, Vector2D.fromPoints(this.pos, this.points[1]));
    endRay.orientation = -1;
    var rays = new RayCollection(startRay, endRay);

    var objects = this.world._objects;
    for (var i = 0; i < objects.length; i++) {
        objects[i].computeRays(this, rays);
    }

    return rays;
};
