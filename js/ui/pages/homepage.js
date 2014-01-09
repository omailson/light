var HomePage = function (element, navigator) {
    Page.call(this, element, navigator);

    this._levelData = {};
    this._playButton = new Button(document.getElementById("hp-play"), this._onPlayClicked.bind(this));
};

inherits(HomePage, Page);

HomePage.prototype._onPlayClicked = function () {
    var levelData = deepCopy(this._levelData);
    this.goTo("game-page", Component.TransitionType.SlideOutLeft,
            Component.TransitionType.SlideInRight, levelData);
};

HomePage.prototype.onNavigatedTo = function (params) {
    this._levelData = params;
};
