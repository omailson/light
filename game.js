var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var paintrays = function (rays) {
    context.save();
    for (var i = 0; i < rays.length; i++) {
        context.beginPath();
        if (rays[i].orientation === 1)
            context.strokeStyle = "blue";
        else
            context.strokeStyle = "red";

        context.moveTo(rays[i].p1.x, rays[i].p1.y);
        context.lineTo(rays[i].p2.x, rays[i].p2.y);
        context.stroke();
    }
    context.restore();
};

var world = new World();

var l = world.createLightSource(
    {x: 100, y: 100},
    [
        {x: 400, y: 20},
        {x: 400, y: 150}
    ],
    "yellow"
);

var o = new Opaque(
    {x: 250, y: 80},
    {x: 250, y: 120}
);

var o2 = new Opaque(
    {x: 250, y: 40},
    {x: 250, y: 70}
);

world.addObject(o);
world.addObject(o2);

var paint = function () {
    var rays = l.computeRays();
    world.paint(context, [rays]);

    paintrays(rays.data);
};

var paintvector = function (v) {
    context.save();
    context.beginPath();
    context.translate(200, 150);
    context.moveTo(0, 0);
    context.lineTo(v.x, v.y);
    context.restore();
    context.stroke();
};
