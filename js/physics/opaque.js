/**
 * An opaque object
 *
 * @class Opaque
 * @param p1 {Object} An edge of the object
 * @param p2 {Object} Another edge of the object
 */
var Opaque = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
};

/**
 * Add a opaque object to compute the rays
 *
 * @method computeRays
 * @param light {Light} A light source
 * @param rays {RayCollection} Collection of rays to be processed
 */
Opaque.prototype.computeRays = function (light, rays) {
    var p;
    var opaqueSegment = new LineSegment(this.p1, this.p2);
    for (var i = 0; i < rays.data.length; i++) {
        // Check whether this new object intersects existing Rays
        p = rays.data[i].intersectionPoint(opaqueSegment);
        if (p !== null) {
            // Since this object is opaque the Ray won't go through the object
            rays.data[i].p2 = p;
        }
    }

    // Create a vector that goes from the source of light to the edges of the object
    var vp1 = (new LineSegment(rays.lightPos, this.p1)).toVector();
    var vp2 = (new LineSegment(rays.lightPos, this.p2)).toVector();

    var order = vp1.crossProduct(vp2);

    if (!rays.contains(this.p1))
        vp1 = null;

    if (!rays.contains(this.p2))
        vp2 = null;

    if (vp1) {
        var rp1 = new Ray(this.p1, vp1);

        if (order > 0)
            rp1.orientation = -1;

        rays.insert(rp1);
    }

    if (vp2) {
        var rp2 = new Ray(this.p2, vp2);

        if (order < 0)
            rp2.orientation = -1;

        rays.insert(rp2);
    }
};

/**
 * Paint the object to a context
 *
 * @method paint
 * @param context {CanvasRenderingContext2D} A canvas 2D context
 */
Opaque.prototype.paint = function (context) {
    context.save();
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.p1.x, this.p1.y);
    context.lineTo(this.p2.x, this.p2.y);
    context.stroke();
    context.restore();
};
