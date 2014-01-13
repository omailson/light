var TestLevels = {};

TestLevels.levels = [
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 250, y: 120}},
            {type: "opaque", p1: {x: 250, y: 40}, p2: {x: 250, y: 70}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 249, y: 125}},
            {type: "opaque", p1: {x: 250, y: 40}, p2: {x: 250, y: 70}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 210, y: 101}},
            {type: "opaque", p1: {x: 250, y: 40}, p2: {x: 250, y: 70}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 279, y: 105}},
            {type: "opaque", p1: {x: 250, y: 215}, p2: {x: 280, y: 215}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 280, y: 108}},
            {type: "opaque", p1: {x: 250, y: 215}, p2: {x: 280, y: 215}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 280, y: 108}},
            {type: "opaque", p1: {x: 240, y: 214}, p2: {x: 280, y: 215}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "opaque", p1: {x: 250, y: 80}, p2: {x: 250, y: 110}},
            {type: "opaque", p1: {x: 204, y: 53}, p2: {x: 204, y: 128}},
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "opaque", p1: {x: 250, y: 80}, p2: {x: 250, y: 110}},
            {type: "opaque", p1: {x: 204, y: 53}, p2: {x: 204, y: 94}},
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 280, y: 108}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 253, y: 80}, p2: {x: 280, y: 108}},
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 253, y: 80}, p2: {x: 285, y: 181}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 166, y: 81}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 253, y: 80}, p2: {x: 285, y: 181}},
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 226, y: 113}},
            {type: "opaque", p1: {x: 240, y: 214}, p2: {x: 280, y: 215}},
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 74, y: -38}}, {p1: {x: 110, y: 101.66666}, vector: {x: 56, y: 80}}], color: "yellow"},
        ],
    },
    {
        sprites: [
            {type: "light", color: "yellow", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 90, y: -53.333334}}, {p1: {x: 110, y: 101.66666}, vector: {x: 46, y: 83.33334}}]},
            {type: "mirror", p1: {x: 219, y: 59}, p2: {x: 217, y: 188}}
        ],
    },
    {
        sprites: [
            {type: "light", color: "yellow", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 90, y: -53.333334}}, {p1: {x: 110, y: 101.66666}, vector: {x: 46, y: 83.33334}}]},
            {type: "mirror", p1: {x: 272, y: 57}, p2: {x: 270, y: 186}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 323, y: 74}, p2: {x: 323, y: 119}},
            {type: "mirror", p1: {x: 50, y: 76}, p2: {x: 50, y: 121}}
        ],
    },
    {
        sprites: [
            {type: "light", rays: [{p1: {x: 110, y: 97.33333}, vector: {x: 300, y: -80}}, {p1: {x: 110, y: 101.66666}, vector: {x: 300, y: 50}}], color: "yellow"},
            {type: "mirror", p1: {x: 250, y: 80}, p2: {x: 310, y: 72}},
        ],
    },
    {
        sprites: [
            {type: "lightbox", pos: {x: 50, y: 200}, color: "yellow", structure: {width: 4, height: 4, map: [0, 1,0, 0, 1,1, 1, 1,1, 1, 1,1]}},
        ],
    },
    {
        sprites: [
            {type: "lightbox", pos: {x: 150, y: 200}, color: "yellow", structure: {width: 4, height: 4, map: [1, 1,1, 2, 2,2, 1, 1,1, 1, 1,1]}},
        ],
    },
    {
        sprites: [
            {type: "lightbox", pos: {x: 150, y: 200}, color: "yellow", structure: {width: 4, height: 4, map: [1, 1,1, 2, 2,2, 1, 1,1, 1, 1,1]}},
            {type: "target", pos: {x: 175, y: 50}, colors: ["yellow"]},
        ],
    },
];
