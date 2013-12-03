var GameFactory = function () {
};

GameFactory.prototype.create = function (canvasElement, levelData) {
    var worldBuilder = new WorldBuilder();
    var sceneBuilder = this._createSceneBuilder(worldBuilder);

    var scene = sceneBuilder.scene();
    this._createSceneSprites(sceneBuilder, levelData.sprites);

    // TODO: continue from here
    var world = worldBuilder.getWorld();
    // world.setLevelData(levelData);

    var context = canvasElement.getContext("2d");

    return new Game(world, scene, context);
};

GameFactory.prototype._createSceneBuilder = function (worldBuilder) {
    return new SceneBuilder(worldBuilder);
};

GameFactory.prototype._createSceneSprites = function (sceneBuilder, sprites) {
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i].type === "opaque") {
            sceneBuilder.buildOpaqueSprite(sprites[i]);
        } else if (sprites[i].type === "mirror") {
            sceneBuilder.buildMirrorSprite(sprites[i]);
        } else if (sprites[i].type === "light") {
            sceneBuilder.buildLightSprite(sprites[i]);
        }
    }
};