var Debugger = function (main) {
    this.main = main;
};

Debugger.prototype.game = function() {
    return this.main._gameController._game;
};

Debugger.prototype.context = function () {
    return this.game()._context;
};

Debugger.prototype.scene = function () {
    return this.game()._scene;
};

Debugger.prototype.dumpLevel = function () {
    var level = [];
    var lights = this.scene()._lights;
    for (var i = 0; i < lights.length; i++) {
        var data = this.dumpLight(lights[i]);
        level.push(data);
    }

    var objects = this.scene()._sprites;
    for (var i = 0; i < objects.length; i++) {
        var data = this.dumpObject(objects[i]);
        level.push(data);
    }

    return level;
};

Debugger.prototype.dumpObject = function (object) {
    var data = {};
    if (object instanceof MirrorSprite)
        data.type = "mirror";
    else
        data.type = "opaque";
    data.p1 = {x: object.p1.x, y: object.p1.y};
    data.p2 = {x: object.p2.x, y: object.p2.y};

    return data;
};

Debugger.prototype.dumpLight = function (light) {
    var data = {};
    data.type = "light";
    data.color = light.color;

    data.rays = [
        this.dumpRay(light.entity.body.startRay()),
        this.dumpRay(light.entity.body.endRay())
    ];

    return data;
};

Debugger.prototype.dumpRay = function (ray) {
    var data = {};
    data.p1 = {x: ray.p1.x, y: ray.p1.y};
    if (ray.isFinite())
        data.p2 = {x: ray.p2.x, y: ray.p2.y};
    data.vector = {x: ray.vector.x, y: ray.vector.y};

    return data;
};

Debugger.prototype.paintRayCollection = function (rayCollection) {
    for (var i = 0; i < rayCollection.data.length; i++) {
        this.paintRay(rayCollection.data[i]);
    }
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
        var intersectionPoint = LightEntity.prototype._borderIntersection.bind(null);
        var bounds = {x: 0, y: 0, width: this.scene().width, height: this.scene().height};
        p2 = intersectionPoint(ray, bounds);
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
