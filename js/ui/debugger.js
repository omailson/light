var Debugger = function (main) {
    this.main = main;
};

Debugger.prototype.context = function () {
    return this.main._game._context;
};

Debugger.prototype.scene = function () {
    return this.main._game._scene;
};

Debugger.prototype.paintRay = function (ray) {
    var context = this.context();
    context.save();
    context.beginPath();
    if (ray.orientation === 1)
        context.strokeStyle = "blue";
    else
        context.strokeStyle = "red";

    var p1 = ray.p1;
    var p2 = null;
    if (ray.isFinite()) {
        p2 = ray.p2;
    } else {
        var intersectionPoint = LightSprite.prototype._intersectionPoint.bind(null);
        var bounds = {x: 0, y: 0, width: this.scene().width, height: this.scene().height};
        var intersection = intersectionPoint(ray, bounds);
        p2 = intersection.point;
    }

    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();

    context.restore();
};

Debugger.prototype.paintLineSegment = function (lineSegment) {
    var context = this.context();
    context.save();
    context.beginPath();

    context.strokeStyle = "black";
    context.moveTo(lineSegment.p1.x, lineSegment.p1.y);
    context.lineTo(lineSegment.p2.x, lineSegment.p2.y);

    context.stroke();
    context.restore();
};
