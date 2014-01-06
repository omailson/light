var Scene = function () {
    this._sprites = [];
    this._lights = [];

    this.width = 0;
    this.height = 0;
};

Scene.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
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
    for (var i = 0; i < this._lights.length; i++) {
        this._lights[i].paint(context);
    }

    for (var i = 0; i < this._sprites.length; i++) {
        this._sprites[i].paint(context);
    }
};
