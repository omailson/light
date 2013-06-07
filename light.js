var Light = function (pos, lights, color) {
    this.pos = pos;
    this.lights = [];
    this.color = color;

    this.lights.push(new Ray(this.pos, lights[0]));
    this.lights.push(new Ray(this.pos, lights[1], -1));
};

Light.prototype.paint = function (context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.pos.x, this.pos.y);
    for (var i = 0; i < this.lights.length; i++) {
        context.lineTo(this.lights[i].oriented().p1.x, this.lights[i].oriented().p1.y);
        context.lineTo(this.lights[i].oriented().p2.x, this.lights[i].oriented().p2.y);
    }
    context.fill();
};

Light.prototype.addOpaque = function (opaque) {
    var p;
    var opaqueSegment = new LineSegment(opaque.p1, opaque.p2);
    for (var i = 0; i < this.lights.length; i++) {
        var lightSegment = new LineSegment(this.lights[i].p1, this.lights[i].p2);
        p = lightSegment.intersection(opaqueSegment);
        if (p !== null) {
            this.lights[i].p2 = p;
        }
    }

    var vp1 = (new LineSegment(this.pos, opaque.p1)).toVector();
    var vp2 = (new LineSegment(this.pos, opaque.p2)).toVector();

    var order = vp1.crossProduct(vp2);

    if (!this.isInside(opaque.p1))
        vp1 = null;

    if (!this.isInside(opaque.p2))
        vp2 = null;

    if (vp1) {
        var t = (400 - opaque.p1.x)/vp1.x;
        var y = opaque.p1.y + t*vp1.y;
        var rp1 = new Ray(opaque.p1, {x: 400, y: y});

        if (order > 0)
            rp1.orientation = -1;

        this.insertRay(rp1);
    }

    if (vp2) {
        var t = (400 - opaque.p2.x)/vp2.x;
        var y = opaque.p2.y + t*vp2.y;
        var rp2 = new Ray(opaque.p2, {x: 400, y: y});

        if (order < 0)
            rp2.orientation = -1;

        this.insertRay(rp2);
    }
};

Light.prototype.insertRay = function (ray) {
    for (var i = 0; i < this.lights.length; i++) {
        var cp = this.lights[i].toVector().crossProduct(ray.toVector());
        if (cp < 0) {
            this.lights.splice(i, 0, ray);
            break;
        }
    }
};

Light.prototype.isInside = function (p) {
    if (this.lights.length === 0)
        return false;

    var bb = {
        "left": Math.min(this.lights[0].p1.x, this.lights[0].p2.x),
        "right": Math.max(this.lights[0].p1.x, this.lights[0].p2.x),
        "top": Math.min(this.lights[0].p1.y, this.lights[0].p2.y),
        "bottom": Math.max(this.lights[0].p1.y, this.lights[0].p2.y)
    };

    for (var i = 1; i < this.lights.length; i++) {
        bb.left = Math.min(bb.left, Math.min(this.lights[i].p1.x, this.lights[i].p2.x));
        bb.right = Math.max(bb.right, Math.max(this.lights[i].p1.x, this.lights[i].p2.x));
        bb.top  = Math.min(bb.top, Math.min(this.lights[i].p1.y, this.lights[i].p2.y));
        bb.bottom = Math.max(bb.bottom, Math.max(this.lights[i].p1.y, this.lights[i].p2.y));
    }

    // Check whether the point is inside the bounding box
    if (p.x < bb.left || p.x > bb.right || p.y < bb.top || p.y > bb.bottom)
        return false;

    // Ray casting
    // Count the number of intersections to that point
    // http://en.wikipedia.org/wiki/Point_in_polygon
    var intersections = 0;
    // A point outside the polygon
    var pIni = {x: bb.left - 0.5, y: p.y};
    var rayCast = new LineSegment(pIni, p);
    for (var i = 0; i < this.lights.length; i++) {
        if (this.lights[i].lineSegment().intersection(rayCast) !== null)
            intersections++;
    }

    if (intersections % 2 === 0)
        return false;

    return true;
};
