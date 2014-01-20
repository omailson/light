var Scene = function () {
    this._sprites = [];
    this._lights = [];

    /**
     * Composition buffer
     *
     * This buffer will be used by all LightBoxSprite to compute the color
     * mixture of all light sources
     *
     * @property _compositionBuffer
     * @type CanvasRenderingContext2D
     * @default null
     * @private
     */
    this._compositionBuffer = null;

    this.width = 0;
    this.height = 0;
};

Scene.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
};

/**
 * Set the context used to compute color composition
 *
 * @method setCompositionBuffer
 * @param compositionBuffer {CanvasRenderingContext2D}
 */
Scene.prototype.setCompositionBuffer = function(compositionBuffer) {
    this._compositionBuffer = compositionBuffer;
};

/**
 * @method compositionBuffer
 * @return {CanvasRenderingContext2D}
 */
Scene.prototype.compositionBuffer = function() {
    return this._compositionBuffer;
};

Scene.prototype.addLight = function (light) {
    this._lights.push(light);
};

Scene.prototype.addSprite = function (sprite) {
    this._sprites.push(sprite);
};

Scene.prototype.addLightBox = function (lightBox) {
    this._lights.push(lightBox);
};

Scene.prototype.update = function (delta) {
    for (var i = 0; i < this._lights.length; i++) {
        this._lights[i].update(delta);
    }

    for (var i = 0; i < this._sprites.length; i++) {
        this._sprites[i].update(delta);
    }
};

Scene.prototype.paint = function (context) {
    this._clearBuffer();
    for (var i = 0; i < this._lights.length; i++) {
        this._lights[i].paint(context);
    }
    this._drawBuffer(context);

    for (var i = 0; i < this._sprites.length; i++) {
        this._sprites[i].paint(context);
    }
};

/**
 * @method _clearBuffer
 * @private
 */
Scene.prototype._clearBuffer = function() {
    this._compositionBuffer.canvas.width = this._compositionBuffer.canvas.width;
};

/**
 * @method _drawBuffer
 * @param context {CanvasRenderingContext2D}
 * @private
 */
Scene.prototype._drawBuffer = function(context) {
    context.drawImage(this._compositionBuffer.canvas, 0, 0);
};
