var LineSegment = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
};

LineSegment.prototype.toVector = function () {
    return new Vector2D(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
};

LineSegment.prototype.intersection = function (line) {
    var p1 = this.p1;
    var p2 = this.p2;
    var q1 = line.p1;
    var q2 = line.p2;

    var v = this.toVector();
    var u = line.toVector();

    if (v.crossProduct(u) === 0)
        return null;

    var p1v = new Vector2D(p1.x, p1.y);
    var q1v = new Vector2D(q1.x, q1.y);
    var t = Vector2D.sub(q1v, p1v);
    t = t.crossProduct(u);
    t = t / v.crossProduct(u);

    var r = {x: p1.x + v.x*t, y: p1.y + v.y*t};

    if (MathHelper.between(q1.x, r.x, q2.x) &&
            MathHelper.between(q1.y, r.y, q2.y) &&
            t >= 0 && t <= 1)
        return r;

    return null;
};
