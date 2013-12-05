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

Scene.prototype.paint = function (context, rays) {
    for (var i = 0; i < this._lights.length; i++) {
        this._lights[i].paint(context, rays[i].rays);
    }

    for (var i = 0; i < this._sprites.length; i++) {
        this._sprites[i].paint(context);
    }
};
