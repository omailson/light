var LightBoxEntity = function (params) {
    this.blockWidth = 30;
    this.blockHeight = 30;

    this.x = params.pos.x;
    this.y = params.pos.y;
    this.structure = params.structure;
    this.color = params.color;

    this.width = params.structure.width * this.blockWidth;
    this.height = params.structure.height * this.blockWidth; // Yes, width

    this.drawPoints = [];

    // New lights. To be consumed by the GameWorld
    this.newLights = [];
    this.destroyedLights = []; // To be consumed by the GameWorld
    // Internal reference to all owned light entities
    this._lights = [];

    this._blockDestroyedDispatcher = new EventDispatcher();

    this._computeLightSources();
};

inherits(LightBoxEntity, InteractiveEntity);

LightBoxEntity.prototype.initPhysics = function (physicsWorld) {
};

LightBoxEntity.prototype.computeDrawPoints = function (bounds) {
    this.drawPoints.length = 0;
    for (var i = 0; i < this._lights.length; i++) {
        this._lights[i].computeDrawPoints(bounds);
        this.drawPoints = this.drawPoints.concat(this._lights[i].drawPoints);
    }
};

LightBoxEntity.prototype.update = function (delta) {
    for (var i = 0; i < this._lights.length; i++) {
        this._lights[i].update(delta);
    }
};

LightBoxEntity.prototype._computeLightSources = function () {
    this.destroyedLights = this.destroyedLights.concat(this._lights);
    this._lights.length = 0;

    for (var i = 0; i < this.structure.map.length; i++) {
        if (this.structure.map[i] === 0) {
            var light = new LightEntity(this._getBlockRays(i));
            this._lights.push(light);
            this.newLights.push(light);
        }
    }

    // TODO combine adjacent lights into one. unless the resulting light is wider than 120 degress (or >= 180 degrees? use Fuzzy)
};

/**
 * Given a block number, return the start and end ray of the light that comes out of that block
 *
 * @method _getBlockRays
 * @param block {Number} the block number. 0 is the top-left corner
 * @return {Object} A tuple containing 2 rays (startRay, endRay)
 * @private
 */
LightBoxEntity.prototype._getBlockRays = function (block) {
    var rect = this.boundingBox();

    /*
     * Create an array containing the coordinates of each element of the border
     * of a matrix (except the corners)
     *
     *       (1,0) (2,0) (3,0)
     * (0,1)                   (4,1)
     * (0,2)                   (4,2)
     * (0,3)                   (4,3)
     *       (1,4) (2,4) (3,4)
     *
     * Those elements will be presented in the following order:
     * (1,0) (2,0) (3,0) (4,1) (4,2) (4,3) (3,4) (2,4) (1,4) (0,3) (0,2) (0,1)
     *
     * So the first block (at the top-left corner) will use (0,1) to compute
     * the startPoint (thus the startRay) and (1,0) to compute the endPoint.
     * The second block will use (1,0) for the startPoint and (2,0) for the
     * endPoint, and so forth.
     */
    var directions = [];
    var x = 0;
    var y = 0;
    var w = this.structure.width;
    var h = this.structure.height;
    for (x = 1; x < w; x++)
        directions.push(new Vector2D(x, y));
    for (y = 1; y < h; y++)
        directions.push(new Vector2D(x, y));
    for (x = w - 1; x > 0; x--)
        directions.push(new Vector2D(x, y));
    for (y = h - 1; y > 0; y--)
        directions.push(new Vector2D(x, y));

    var directionStart = block > 0 ? block - 1 : directions.length - 1;
    var directionEnd = block;
    var startPoint = {x: rect.left() + directions[directionStart].x * rect.width / this.structure.width,
        y: rect.top() + directions[directionStart].y * rect.height / this.structure.height};
    var endPoint = {x: rect.left() + directions[directionEnd].x * rect.width / this.structure.width,
        y: rect.top() + directions[directionEnd].y * rect.height / this.structure.height};

    var params = {
        startRay: new Ray(startPoint, Vector2D.fromPoints(rect.center(), startPoint)),
        endRay: new Ray(endPoint, Vector2D.fromPoints(rect.center(), endPoint))
    };

    return params;
};

/**
 * Return the bounding box of the object
 *
 * @method boundingBox
 * @return {Rectangle}
 */
LightBoxEntity.prototype.boundingBox = function () {
    var rect = new Rectangle(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
    );

    return rect;
};

/**
 * Whether any light of the light box hits the target
 *
 * @method hits
 * @param target {TargetEntity}
 * @return {Boolean}
 */
LightBoxEntity.prototype.hits = function (target) {
    var p = {x: target.x, y: target.y};
    for (var i = 0; i < this._lights.length; i++) {
        var rays = this._lights[i].rays();
        for (var j = 0; j < rays.length; j++) {
            if (rays[j].contains(p))
                return true;
        }
    }

    return false;
};

/**
 * Return the central region, which in not supposed to have interaction
 *
 * @method _innerBoundingBox
 * @return {Rectangle}
 * @private
 */
LightBoxEntity.prototype._innerBoundingBox = function () {
    var bb = this.boundingBox();
    var rect = new Rectangle(
        bb.x + this.blockWidth,
        bb.y + this.blockHeight,
        bb.width - 2*this.blockHeight, // Yes, height.
        bb.height - 2*this.blockHeight
    );

    return rect;
};

LightBoxEntity.prototype.acceptsInputEvent = function (input) {
    if (input.type !== InputEvent.Type.Press &&
            input.type !== InputEvent.Type.Release)
        return false;

    if (this.boundingBox().contains(input.position) &&
            !this._innerBoundingBox().contains(input.position))
        return true;

    return false;
};

LightBoxEntity.prototype.onPress = function (ev) {
};

LightBoxEntity.prototype.onRelease = function (ev) {
    var relativePos = {x: ev.position.x - this.boundingBox().x,
        y: ev.position.y - this.boundingBox().y};
    var column = Math.floor(relativePos.x / this.blockWidth);
    var row = Math.floor(relativePos.y / this.blockWidth); // Yes, width
    var total = 2*this.structure.width + 2*this.structure.height - 4;
    var index = column >= row ? column + row : total - (column + row);

    if (this.structure.map[index] === 1) {
        this.structure.map[index] = 0;
        this._computeLightSources();
        this._blockDestroyedDispatcher.dispatch();
    }
};

LightBoxEntity.prototype.addBlockDestroyedEventListener = function(listener) {
    this._blockDestroyedDispatcher.addListener(listener);
};

LightBoxEntity.prototype.removeBlockDestroyedEventListener = function(listener) {
    this._blockDestroyedDispatcher.removeListener(listener);
};
