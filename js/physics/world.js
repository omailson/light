/**
 * A World
 *
 * @class World
 */
var World = function () {
    this._lights = [];
    this._objects = [];
};

World.prototype.createLightSource = function (startRay, endRay) {
    var light = new Light(startRay, endRay);
    light.world = this;
    this._lights.push(light);

    return light;
};

World.prototype.addObject = function (object) {
    this._objects.push(object);
};

World.prototype.step = function () {
    for (var i = 0; i < this._lights.length; i++) {
        this._lights[i].rays = this.computeRays(this._lights[i]);
    }
};

/**
 * Destroy a physics body
 *
 * @method destroyBody
 * @param body {Object} The physics body to destroy
 */
World.prototype.destroyBody = function (body) {
    if (!body)
        return;

    if (body instanceof Light) {
        for (var i = 0; i < this._lights.length; i++) {
            if (this._lights[i] === body) {
                this._lights.splice(i, 1);
                break;
            }
        }
    } else {
        for (var i = 0; i < this._objects.length; i++) {
            if (this._objects[i] === body) {
                this._objects.splice(i, 1);
                break;
            }
        }
    }
};

World.prototype.fetchRays = function (light) {
};

World.prototype.computeRays = function (light) {
    var startRay = light.startRay();
    var endRay = light.endRay();
    endRay.orientation = -1;
    var rays = [new RayCollection(startRay, endRay)];

    for (var i = 0; i < rays.length; i++) {
        if (rays[i].opacity <= 0)
            break;

        for (var j = 0; j < this._objects.length; j++) {
            this._objects[j].generateRays(rays[i]);
        }

        var collectionEmptied = false;
        for (var j = 0; j < this._objects.length; j++) {
            this._objects[j].computeRays(rays[i]);
            // Remove RayCollection if all rays are occluded by this object
            if (rays[i].data.length === 0) {
                rays.splice(i, 1);
                i--;
                collectionEmptied = true;
            }
        }

        for (var j = 0; !collectionEmptied && j < this._objects.length; j++) {
            if (this._objects[j] instanceof Mirror) {
                var newRays = this._objects[j].computeReflection(rays[i]);
                if (newRays && newRays.opacity > 0)
                    rays.push(newRays);
            }
        }
    }

    return rays;
};
