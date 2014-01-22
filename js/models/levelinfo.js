var Level = function (params) {
    this.sprites = params.sprites;
};

Level.prototype.maxScore = function() {
    var lightBoxBlocks = 0;
    var wallBlocks = 0;
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].type === "lightbox") {
            // Count the number of breakable blocks (block == 1)
            lightBoxBlocks += this.sprites[i].structure.map.reduce(function (prev, cur) {
                return cur === 1 ? prev + cur : prev;
            });
        } else if (this.sprites[i].type === "wall") {
            // Count the number of breakable blocks (block == 1)
            wallBlocks += this.sprites[i].structure.map.reduce(function (prev, cur) {
                return cur === 1 ? prev + cur : prev;
            });
        }
    }

    var multiplier = Math.pow(2, lightBoxBlocks);

    var lightBoxPoints = multiplier*2 - 2;
    var wallPoints = multiplier * wallBlocks;

    return lightBoxPoints + wallPoints;
};

Level.prototype.clone = function () {
    var params = {
        sprites: deepCopy(this.sprites)
    };

    var copy = new Level(params);

    return copy;
};
