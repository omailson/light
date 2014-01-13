var HomePage = function (element, navigator) {
    Page.call(this, element, navigator);

    this._levelModel = [];
    this._playButton = new Button(DOMTree.get(R.HomePage.Play), this._onPlayClicked.bind(this));
};

inherits(HomePage, Page);

HomePage.prototype._onPlayClicked = function () {
    this.goTo("level-page", Component.TransitionType.SlideOutLeft,
            Component.TransitionType.SlideInRight, this._levelModel);
};

HomePage.prototype.onNavigatedTo = function (params) {
    this._levelModel = params;
};
