var LightBoxSprite = function () {
    this.x = 0;
    this.y = 0;
    this.color = "";
    this.entity = null;
};

LightBoxSprite.prototype.update = function (delta) {
    this._drawPoints = this.entity.drawPoints;
};

LightBoxSprite.prototype.paint = function (context) {
    var rect = new Rectangle(
        this.x - this.entity.width / 2,
        this.y - this.entity.height / 2,
        this.entity.width,
        this.entity.height
    );

    context.save();

    context.beginPath();
    context.moveTo(rect.topLeft().x, rect.topLeft().y);
    context.lineTo(rect.topRight().x, rect.topRight().y);
    context.lineTo(rect.bottomRight().x, rect.bottomRight().y);
    context.lineTo(rect.bottomLeft().x, rect.bottomLeft().y);
    context.lineTo(rect.topLeft().x, rect.topLeft().y);
    context.stroke();

    // XXX
    LightSprite.prototype.draw.call(this, context);

    context.restore();
};

LightBoxSprite.prototype.readData = function (data, builder) {
    var params = {
        pos: {x: parseInt(data.pos.x, 10), y: parseInt(data.pos.y, 10)},
        color: data.color
    };

    this.x = params.pos.x;
    this.y = params.pos.y;
    this.color = params.color;
    this.entity = builder.buildLightBoxEntity(params);
};
