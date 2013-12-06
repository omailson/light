var LightSprite = function () {
    this.pos = null;
    this.color = null;
    this.points = [];
    this.entity = null;
};

LightSprite.prototype.update = function (delta) {
};

LightSprite.prototype.paint = function (context, rays) {
    this.draw(context, rays);
};

LightSprite.prototype.draw = function (context) {
    var opacity = 1;
    var rays = this.entity.rays();
    context.save();
    var size = 20;
    context.rect(this.pos.x - size/2 + 0.5, this.pos.y - size/2 + 0.5, size, size);
    context.stroke();
    context.fillStyle = this.color;
    for (var i = 0; i < rays.length; i++, opacity -= 0.2) {
        context.globalAlpha = opacity;
        context.beginPath();
        if (!rays[i].data[0].isFinite()) // XXX
            rays[i].data[0].p2 = this.entity.body.world.intersectionPoint(rays[i].data[0]);
        context.moveTo(rays[i].data[0].oriented().p1.x, rays[i].data[0].oriented().p1.y);
        for (var j = 0; j < rays[i].data.length; j++) {
            if (!rays[i].data[j].isFinite()) // XXX
                rays[i].data[j].p2 = this.entity.body.world.intersectionPoint(rays[i].data[j]);

            context.lineTo(rays[i].data[j].oriented().p1.x, rays[i].data[j].oriented().p1.y);
            context.lineTo(rays[i].data[j].oriented().p2.x, rays[i].data[j].oriented().p2.y);
        }
        context.fill();
    }
    context.restore();
};

LightSprite.prototype.readData = function (data, builder) {
    var params = {
        pos: data.pos,
        points: data.points
    };

    this.pos = params.pos;
    this.points = params.points;
    this.color = data.color;
    this.entity = builder.buildLightEntity(params, builder);
};
