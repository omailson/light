var WallEntity = function (params) {
    this.blockWidth = 30;
    this.blockHeight = 30;

    this.x = params.x;
    this.y = params.y;
    this.structure = params.structure;

    this.width = 0;
    this.height = 0;

    /**
     * Whether the physics should be initialized again
     *
     * @property dirtyPhysics
     * @type Boolean
     * @default false
     */
    this.dirtyPhysics = false;

    this._bodies = [];
    this._blockDestroyedDispatcher = new EventDispatcher();

    this._computeSize();
};

inherits(WallEntity, InteractiveEntity);

/**
 * Return the bounding box of the object
 *
 * @method boundingBox
 * @return {Rectangle}
 */
WallEntity.prototype.boundingBox = function () {
    var rect = new Rectangle(
        this.x,
        this.y,
        this.width,
        this.height
    );

    return rect;
};

WallEntity.prototype._computeSize = function() {
    if (this.structure.orientation === "horizontal") {
        this.width = this.structure.map.length * this.blockWidth;
        this.height = this.blockHeight;
    } else {
        this.width = this.blockHeight;
        this.height = this.structure.map.length * this.blockWidth;
    }
};

WallEntity.prototype.initPhysics = function(physicsWorld) {
    var i, bodyPoints;

    // Destroy old bodies
    for (i = 0; i < this._bodies.length; i++) {
        physicsWorld.destroyBody(this._bodies[i]);
    }
    this._bodies.length = 0;

    // Compute body data
    var pos = -1;
    var size = 0;
    var opaquePoints = [];
    for (i = 0; i < this.structure.map.length; i++) {
        if (this.structure.map[i]) {
            if (pos === -1)
                pos = i;

            size++;
        } else {
            bodyPoints = this._computeBodyPoints(pos, size);
            if (bodyPoints)
                opaquePoints.push(bodyPoints);

            pos = -1;
            size = 0;
        }
    }
    bodyPoints = this._computeBodyPoints(pos, size);
    if (bodyPoints)
        opaquePoints.push(bodyPoints);

    // Create new bodies
    for (i = 0; i < opaquePoints.length; i++) {
        var body = new Opaque(opaquePoints[i].p1, opaquePoints[i].p2);
        this._bodies.push(body);
        physicsWorld.addObject(body);
    }
};

WallEntity.prototype._computeBodyPoints = function(pos, size) {
    if (pos === -1 || size === 0)
        return null;

    var p1, p2;
    if (this.structure.orientation === "horizontal") {
        p1 = {x: this.boundingBox().x + pos*this.blockWidth,
            y: this.boundingBox().y};
        p2 = {x: p1.x + size*this.blockWidth,
            y: this.boundingBox().y};
    } else {
        p1 = {x: this.boundingBox().x,
            y: this.boundingBox().y + pos*this.blockWidth};
        p2 = {x: this.boundingBox().x,
            y: p1.y + size*this.blockWidth};
    }

    return {p1: p1, p2: p2};
};

WallEntity.prototype.update = function(delta) {
};

WallEntity.prototype.acceptsInputEvent = function(input) {
    if (input.type !== InputEvent.Type.Press &&
            input.type !== InputEvent.Type.Release)
        return false;

    if (this.boundingBox().contains(input.position))
        return true;

    return false;
};

WallEntity.prototype.onPress = function(ev) {
};

WallEntity.prototype.onRelease = function(ev) {
    var relativePos = {x: ev.position.x - this.boundingBox().x,
        y: ev.position.y - this.boundingBox().y};

    var index;
    if (this.structure.orientation === "horizontal")
        index = Math.floor(relativePos.x / this.blockWidth);
    else
        index = Math.floor(relativePos.y / this.blockWidth); // Yes, width

    if (this.structure.map[index] === 1) {
        this.structure.map[index] = 0;
        this._computePhysics();
        this._blockDestroyedDispatcher.dispatch();
    }
};

WallEntity.prototype._computePhysics = function() {
    this.dirtyPhysics = true;
};

WallEntity.prototype.addBlockDestroyedEventListener = function(listener) {
    this._blockDestroyedDispatcher.addListener(listener);
};

WallEntity.prototype.removeBlockDestroyedEventListener = function(listener) {
    this._blockDestroyedDispatcher.removeListener(listener);
};
