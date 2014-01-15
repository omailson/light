var Levels = {};

Levels.data = [
    {
        sprites: [
            {type: "lightbox", pos: {x: 80, y: 520}, color: "yellow", structure: {width: 4, height: 4, map: [1, 1,1, 1, 1,1, 1, 1,1, 1, 1,1]}},
            {type: "target", pos: {x: 690, y: 70}, colors: ["yellow"]}
        ]
    },
    {
        sprites: [
            {type: "lightbox", pos: {x: 80, y: 300}, color: "yellow", structure: {width: 4, height: 5, map: [1, 1,1, 1, 1,1,1, 1, 1,1, 1, 1,1,1]}},
            {type: "target", pos: {x: 690, y: 300}, colors: ["yellow"]},
            {type: "wall", pos: {x: 200, y: 130}, structure: {orientation: "vertical", map: [1,1,1,1,1,1,1,1,1,1,1,1]}},
            {type: "wall", pos: {x: 400, y: 130}, structure: {orientation: "vertical", map: [1,1,1,1,1,1,1,1,1,1,1,1]}},
            {type: "wall", pos: {x: 600, y: 130}, structure: {orientation: "vertical", map: [1,1,1,1,1,1,1,1,1,1,1,1]}}
        ]
    },
];
