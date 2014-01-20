var TargetSprite = function () {
    this.x = 0;
    this.y = 0;
    this.colors = [];
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
    var color = this.colors.reduce(TargetSprite._colorReduceFunction);

    context.beginPath();
    context.fillStyle = color.rgbaString();
    context.arc(this.x, this.y, 10, 0, 2*Math.PI);
    context.fill();
    context.stroke();
};

/**
 * @method _colorReduceFunction
 * @private
 * @static
 * @param c1 {Color}
 * @param c2 {Color}
 * @return {Color}
 */
TargetSprite._colorReduceFunction = function (c1, c2) {
    return Color().rgb(ColorUtils.mix(c1.rgbArray(), c2.rgbArray()));
};

TargetSprite.prototype.readData = function (data, builder) {
    var params = {
        x: parseInt(data.pos.x, 10),
        y: parseInt(data.pos.y, 10),
        colors: data.colors
    };

    this.x = params.x;
    this.y = params.y;
    this.colors = params.colors.map(function (color) {
        return Color(color);
    });

    this.entity = builder.buildTargetEntity(params);
};
