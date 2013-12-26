var OpaqueSprite = function () {
    this.p1 = {};
    this.p2 = {};
    this.entity = null;
};

OpaqueSprite.prototype.update = function (delta) {
    this.entity.update(delta);
    this.p1 = this.entity.p1;
    this.p2 = this.entity.p2;
};

OpaqueSprite.prototype.paint = function (context) {
    this.draw(context);
};

OpaqueSprite.prototype.draw = function (context) {
    context.save();
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.p1.x, this.p1.y);
    context.lineTo(this.p2.x, this.p2.y);
    context.stroke();
    context.restore();
};

OpaqueSprite.prototype.readData = function (data, builder) {
    var params = {
        p1: {x: parseInt(data.p1.x, 10), y: parseInt(data.p1.y, 10)},
        p2: {x: parseInt(data.p2.x, 10), y: parseInt(data.p2.y, 10)}
    };

    this.p1 = params.p1;
    this.p2 = params.p2;
    this.entity = builder.buildOpaqueEntity(params);
};
