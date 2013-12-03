var Scene = function () {
    this._sprites = [];
};

Scene.prototype.addSprite = function (sprite) {
    this._sprites.push(sprite);
};

Scene.prototype.paint = function (context) {
    for (var i = 0; i < this._sprites.length; i++) {
        this._sprites[i].paint(context);
    }
};
