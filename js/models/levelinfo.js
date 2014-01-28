var Level = function (params) {
    this.sprites = params.sprites;
    this._maxScore = params.maxScore;

    this.gold = params.gold;
    this.silver = params.silver;
    this.bronze = params.bronze;
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
