/**
 * A World
 *
 * @class World
 */
var World = function () {
    this._bounds = {width: 400, height: 300};
    this._lights = [];
    this._rays = [];
    this._objects = [];
};

/**
 * Sets the World bounds
 *
 * @method setBounds
 * @param bounds {Object} World bounds
 * @param bounds.width {Number}
 * @param bounds.height {Number}
 */
World.prototype.setBounds = function (bounds) {
    this._bounds = bounds;
};

World.prototype.createLightSource = function (source, startPoints, color) {
    var light = new Light(source, startPoints, color);
    light.world = this;
    this._lights.push(light);

    return light;
};

World.prototype.addObject = function (object) {
    this._objects.push(object);
};

World.prototype.fetchRays = function (light) {
};

World.prototype.paint = function (context) {
    var i;

    for (i = 0; i < this._lights.length; i++) {
        this._lights[i].paint(context);
    }

    for (i = 0; i < this._objects.length; i++) {
        this._objects[i].paint(context);
    }
};
