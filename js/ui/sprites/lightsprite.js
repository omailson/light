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
    var rays = this.entity.rays();
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.pos.x, this.pos.y);
    for (var i = 0; i < rays.length; i++) {
        for (var j = 0; j < rays[i].data.length; j++) {
            if (!rays[i].data[j].isFinite()) // XXX
                rays[i].data[j].p2 = this.entity.body.world.intersectionPoint(rays[i].data[j]);

            context.lineTo(rays[i].data[j].oriented().p1.x, rays[i].data[j].oriented().p1.y);
            context.lineTo(rays[i].data[j].oriented().p2.x, rays[i].data[j].oriented().p2.y);
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
