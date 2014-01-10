var GameFactory = function () {
};

GameFactory.prototype.create = function (canvasElement, params) {
    var levelData = deepCopy(params);

    var worldBuilder = new WorldBuilder();
    var sceneBuilder = this._createSceneBuilder(worldBuilder, canvasElement);

    var scene = sceneBuilder.scene();
    this._createSceneSprites(sceneBuilder, levelData.sprites);

    var world = worldBuilder.getWorld();
    world.setSize(scene.width, scene.height);

    var context = canvasElement.getContext("2d");

    return new Game(world, scene, context);
};

GameFactory.prototype._createSceneBuilder = function (worldBuilder, canvasElement) {
    return new SceneBuilder(worldBuilder, canvasElement);
};

GameFactory.prototype._createSceneSprites = function (sceneBuilder, sprites) {
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i].type === "opaque") {
            sceneBuilder.buildOpaqueSprite(sprites[i]);
        } else if (sprites[i].type === "mirror") {
            sceneBuilder.buildMirrorSprite(sprites[i]);
        } else if (sprites[i].type === "light") {
            sceneBuilder.buildLightSprite(sprites[i]);
        } else if (sprites[i].type === "lightbox") {
            sceneBuilder.buildLightBoxSprite(sprites[i]);
        } else if (sprites[i].type === "target") {
            sceneBuilder.buildTargetSprite(sprites[i]);
        }
    }
};
