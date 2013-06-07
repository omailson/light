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

var l = new Light(
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

var paint = function () {
    // reset canvas
    canvas.width = canvas.width;

    l.addOpaque(o);
    l.addOpaque(o2);

    l.paint(context);
    o.paint(context);
    o2.paint(context);

    paintrays(l.lights);
};
