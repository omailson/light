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
 * @param rays {RayCollection} Collection of rays to be processed
 */
Opaque.prototype.computeRays = function (rays) {
    var p;
    var opaqueSegment = new LineSegment(this.p1, this.p2);
    for (var i = 0; i < rays.data.length; i++) {
        if (this._ownsRay(rays.data[i]))
            continue;
        // Check whether this new object intersects existing Rays
        p = rays.data[i].intersectionPoint(opaqueSegment);
        if (p !== null) {
            // Since this object is opaque the Ray won't go through the object
            rays.data[i].p2 = p;
        } else {
            // Remove existing rays that are occluded by this object
            var lightBeanSegment = new LineSegment(rays.data[0].p1, rays.data[rays.data.length-1].p1);
            var raySegment = new LineSegment(rays.lightPos, rays.data[i].p1);
            var lightBeanIntersection = raySegment.intersection(lightBeanSegment);
            var lightSegment = new LineSegment(lightBeanIntersection, rays.data[i].p1);
            p = opaqueSegment.intersection(lightSegment);
            if (p && rays.remove(i))
                i--;
        }
    }
};

Opaque.prototype.generateRays = function (rays) {
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

Opaque.prototype._ownsRay = function (ray) {
    var p1 = new Point(this.p1);
    var p2 = new Point(this.p2);

    return p1.equals(ray.p1) || p2.equals(ray.p1);
};
