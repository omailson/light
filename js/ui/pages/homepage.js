var HomePage = function (element, navigator) {
    Page.call(this, element, navigator);

    this._playButton = new Button(document.getElementById("hp-play"), this._onPlayClicked.bind(this));
};

inherits(HomePage, Page);

HomePage.prototype._onPlayClicked = function () {
    this.goTo("game-page", Component.TransitionType.SlideOutLeft,
            Component.TransitionType.SlideInRight, null);
};
