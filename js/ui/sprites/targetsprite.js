var TargetSprite = function () {
    this.x = 0;
    this.y = 0;
    this.color = null;
    this.entity = null;
};

TargetSprite.prototype.update = function (delta) {
};

TargetSprite.prototype.paint = function (context) {
    context.save();
    this.draw(context);
    context.restore();
};

TargetSprite.prototype.draw = function (context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, 10, 0, 2*Math.PI);
    context.fill();
    context.stroke();
};

TargetSprite.prototype.readData = function (data, builder) {
    var params = {
        x: parseInt(data.pos.x, 10),
        y: parseInt(data.pos.y, 10),
        color: data.color
    };

    this.x = params.x;
    this.y = params.y;
    this.color = params.color;

    this.entity = builder.buildTargetEntity(params);
};
