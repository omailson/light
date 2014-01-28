var Level = function (params) {
    this.sprites = params.sprites;
    this._maxScore = params.maxScore;
};

Level.prototype.maxScore = function() {
    return this._maxScore;
};

Level.prototype.clone = function () {
    var params = {
        sprites: deepCopy(this.sprites)
    };

    var copy = new Level(params);

    return copy;
};
