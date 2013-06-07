var Ray = function (p1, p2, orientation) {
    this.p1 = p1;
    this.p2 = p2;

    this.orientation = orientation || 1;
};

Ray.prototype.toVector = function () {
    return new Vector2D(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
};

Ray.prototype.lineSegment = function () {
    return new LineSegment(this.p1, this.p2);
};

Ray.prototype.toOrientedVector = function () {
    var v = this.toVector();
    v.scalarMult(this.orientation);

    return v;
};

Ray.prototype.oriented = function () {
    if (this.orientation === 1)
        return this;

    return new Ray(this.p2, this.p1, 1);
};
