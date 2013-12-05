var LightSprite = function () {
    this.pos = null;
    this.color = null;
    this.points = [];
};

LightSprite.prototype.update = function (delta) {
};

LightSprite.prototype.paint = function (context, rays) {
    this.draw(context, rays);
};

LightSprite.prototype.draw = function (context, rays) {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.pos.x, this.pos.y);
    for (var j = 0; j < rays.length; j++) {
        for (var i = 0; i < rays[j].data.length; i++) {
            if (!rays[j].data[i].isFinite()) // XXX
                rays[j].data[i].p2 = this.entity.body.world.intersectionPoint(rays[j].data[i]);

            context.lineTo(rays[j].data[i].oriented().p1.x, rays[j].data[i].oriented().p1.y);
            context.lineTo(rays[j].data[i].oriented().p2.x, rays[j].data[i].oriented().p2.y);
        }
    }
    context.fill();
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
