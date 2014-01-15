var WallSprite = function () {
    this.x = 0;
    this.y = 0;
    this.structure = {};
    this.entity = null;

    var images = {
        "sprites/brick_top_left.svg": "data/images/sprites/brick_top_left.svg",
        "sprites/brick_top.svg": "data/images/sprites/brick_top.svg",
        "sprites/brick_top_right.svg": "data/images/sprites/brick_top_right.svg",
        "sprites/brick_right.svg": "data/images/sprites/brick_right.svg",
        "sprites/brick_bottom_right.svg": "data/images/sprites/brick_bottom_right.svg",
        "sprites/brick_bottom.svg": "data/images/sprites/brick_bottom.svg",
        "sprites/brick_bottom_left.svg": "data/images/sprites/brick_bottom_left.svg",
        "sprites/brick_left.svg": "data/images/sprites/brick_left.svg",

        "sprites/dark_top_left.svg": "data/images/sprites/dark_top_left.svg",
        "sprites/dark_top.svg": "data/images/sprites/dark_top.svg",
        "sprites/dark_top_right.svg": "data/images/sprites/dark_top_right.svg",
        "sprites/dark_right.svg": "data/images/sprites/dark_right.svg",
        "sprites/dark_bottom_right.svg": "data/images/sprites/dark_bottom_right.svg",
        "sprites/dark_bottom.svg": "data/images/sprites/dark_bottom.svg",
        "sprites/dark_bottom_left.svg": "data/images/sprites/dark_bottom_left.svg",
        "sprites/dark_left.svg": "data/images/sprites/dark_left.svg",
    };
    ImageLoader.load(images);

    this._brickImages = {
        topLeft: ImageLoader.image("sprites/brick_top_left.svg"),
        top: ImageLoader.image("sprites/brick_top.svg"),
        topRight: ImageLoader.image("sprites/brick_top_right.svg"),
        right: ImageLoader.image("sprites/brick_right.svg"),
        bottomRight: ImageLoader.image("sprites/brick_bottom_right.svg"),
        bottom: ImageLoader.image("sprites/brick_bottom.svg"),
        bottomLeft: ImageLoader.image("sprites/brick_bottom_left.svg"),
        left: ImageLoader.image("sprites/brick_left.svg")
    };

    this._darkImages = {
        topLeft: ImageLoader.image("sprites/dark_top_left.svg"),
        top: ImageLoader.image("sprites/dark_top.svg"),
        topRight: ImageLoader.image("sprites/dark_top_right.svg"),
        right: ImageLoader.image("sprites/dark_right.svg"),
        bottomRight: ImageLoader.image("sprites/dark_bottom_right.svg"),
        bottom: ImageLoader.image("sprites/dark_bottom.svg"),
        bottomLeft: ImageLoader.image("sprites/dark_bottom_left.svg"),
        left: ImageLoader.image("sprites/dark_left.svg")
    };
};

WallSprite.prototype.update = function(delta) {
    this.structure = this.entity.structure;
};

WallSprite.prototype.paint = function(context) {
    context.save();
    this.draw(context);
    context.restore();
};

WallSprite.prototype.draw = function(context) {
    for (var i = 0; i < this.structure.map.length; i++) {
        if (this.structure.map[i] === 0)
            continue;

        var images = null;
        if (this.structure.map[i] === 1)
            images = this._brickImages;
        else
            images = this._darkImages;

        var image = null;
        if (this.structure.orientation === "horizontal") {
            image = images.top;
            context.drawImage(image, 0, 0, image.width, image.height,
                    this.x + i*this.entity.blockWidth, this.y,
                    this.entity.blockWidth, this.entity.blockHeight);
        } else {
            image = images.left;
            context.drawImage(image, 0, 0, image.width, image.height,
                    this.x, this.y + i*this.entity.blockWidth, // Yes, width
                    this.entity.blockHeight, // Swapped due the rotation
                    this.entity.blockWidth);
        }
    }
};

WallSprite.prototype.readData = function(data, builder) {
    var params = {
        x: parseInt(data.pos.x, 10),
        y: parseInt(data.pos.y, 10),
        structure: data.structure
    };

    this.x = params.x;
    this.y = params.y;
    this.structure = params.structure;
    this.entity = builder.buildWallEntity(params);
};
