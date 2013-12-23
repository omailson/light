var Main = function () {
};

Main.prototype.run = function () {
    var gameFactory = new GameFactory();
    var levelData = {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 250, y: 120}},
            {type: "opaque", p1: {x: 250, y: 40}, p2: {x: 250, y: 70}}
        ]
    };
    var game = gameFactory.create(document.getElementById("canvas"), levelData);
    game.update(0);
    game.paint();
};
