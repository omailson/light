var LightBoxSprite = function () {
    this.x = 0;
    this.y = 0;
    this.color = "";
    this.entity = null;
    this.structure = {};

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

LightBoxSprite.prototype.update = function (delta) {
    this._drawPoints = this.entity.drawPoints;
    this.structure = this.entity.structure;
};

LightBoxSprite.prototype.paint = function (context) {
    var rect = this.entity.boundingBox();

    context.save();

    // Fill the background with the light color
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(rect.topLeft().x, rect.topLeft().y);
    context.lineTo(rect.topRight().x, rect.topRight().y);
    context.lineTo(rect.bottomRight().x, rect.bottomRight().y);
    context.lineTo(rect.bottomLeft().x, rect.bottomLeft().y);
    context.lineTo(rect.topLeft().x, rect.topLeft().y);
    context.fill();


    // XXX
    LightSprite.prototype.draw.call(this, context);

    // Paint the border
    var w = this.structure.width;
    var h = this.structure.height;
    var total = 2*w + 2*h - 4;
    var idx;
    for (var i = 0; i < w; i++) {
        var j = 0;
        while (j < h) {
            idx = i >= j ? i + j : total - (i + j);
            var img = null;
            var images = null;
            if (this.structure.map[idx] === 1)
                images = this._brickImages;
            else if (this.structure.map[idx] === 2)
                images = this._darkImages;

            if (images) {
                if (i === 0 && j === 0)
                    img = images.topLeft;
                else if (i === w-1 && j === 0)
                    img = images.topRight;
                else if (i === 0 && j === h-1)
                    img = images.bottomLeft;
                else if (i === w-1 && j === h-1)
                    img = images.bottomRight;
                else if (j === 0)
                    img = images.top;
                else if (j === h-1)
                    img = images.bottom;
                else if (i === 0)
                    img = images.left;
                else if (i === w-1)
                    img = images.right;
                else
                    img = null;
            }

            if (img)
                context.drawImage(img, 0, 0, img.width, img.height,
                        rect.left() + i*this.entity.blockWidth,
                        rect.top() + j*this.entity.blockWidth, // Yes, width
                        this.entity.blockWidth,
                        this.entity.blockHeight);

            if (i === 0 || i === w-1 || j === h-1)
                j++;
            else
                j = h - 1;
        }
    }

    context.restore();
};

LightBoxSprite.prototype.readData = function (data, builder) {
    var params = {
        pos: {x: parseInt(data.pos.x, 10), y: parseInt(data.pos.y, 10)},
        color: data.color,
        structure: data.structure
    };

    this.x = params.pos.x;
    this.y = params.pos.y;
    this.color = params.color;
    this.structure = params.structure;
    this.entity = builder.buildLightBoxEntity(params);
};
