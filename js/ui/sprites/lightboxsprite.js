var LightBoxSprite = function (compositionBuffer) {
    this.x = 0;
    this.y = 0;
    this.color = "";
    this.entity = null;
    this.structure = {};
    this._buffer = compositionBuffer;
    this._localBuffer = this._createLocalBuffer();

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

    // Draw light only
    this._drawLight();

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

LightBoxSprite.prototype._drawLight = function() {
    this._localBuffer.canvas.width = this._localBuffer.canvas.width;
    LightSprite.prototype.draw.call(this, this._localBuffer); // XXX

    var src = this._localBuffer.getImageData(0, 0,
            this._localBuffer.canvas.width,
            this._localBuffer.canvas.height);
    var dest = this._buffer.getImageData(0, 0,
            this._buffer.canvas.width, this._buffer.canvas.height);

    var total = src.data.length;
    for (var i = 0; i < total; i += 4) {
        if (src.data[i+3] === 0)
            continue;

        if (dest.data[i+3] === 0) {
            dest.data[i+0] = src.data[i+0];
            dest.data[i+1] = src.data[i+1];
            dest.data[i+2] = src.data[i+2];
            dest.data[i+3] = src.data[i+3];
        } else {
            var c1 = [src.data[i+0], src.data[i+1], src.data[i+2], src.data[i+3]];
            var c2 = [dest.data[i+0], dest.data[i+1], dest.data[i+2], dest.data[i+3]];
            var color = ColorUtils.mix(c1, c2);
            dest.data[i+0] = color[0];
            dest.data[i+1] = color[1];
            dest.data[i+2] = color[2];
            dest.data[i+3] = 255;
        }
    }

    this._buffer.putImageData(dest, 0, 0);
};

LightBoxSprite.prototype._createLocalBuffer = function() {
    var localCanvas = document.createElement("canvas");
    localCanvas.width = this._buffer.canvas.width;
    localCanvas.height = this._buffer.canvas.height;

    return localCanvas.getContext("2d");
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
