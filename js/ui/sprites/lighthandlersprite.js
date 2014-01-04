var LightHandlerSprite = function (entity) {
    this.entity = entity;
    this.p1 = this.entity.p1();
    this.p2 = this.entity.p2();
};

LightHandlerSprite.prototype.update = function (delta) {
    this.p1 = this.entity.p1();
    this.p2 = this.entity.p2();
};

LightHandlerSprite.prototype.draw = function (context) {
    var p1 = this.p1;
    var p2 = this.p2;

    context.save();
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();

    context.beginPath();
    context.fillStyle = "black";
    context.arc(p2.x, p2.y, 4, 0, 2*Math.PI);
    context.fill();
    context.restore();
};
