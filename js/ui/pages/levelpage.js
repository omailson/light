var LevelPage = function (element, navigator) {
    Page.call(this, element, navigator);

    this._levelModel = null;
    this._levelButtons = [];
    this._backButton = new Button(DOMTree.get(R.LevelPage.Back), this._onBackPressed.bind(this));
};

inherits(LevelPage, Page);

LevelPage.prototype.onNavigatedTo = function (params) {
    this._levelModel = params;
    this._createLevelButtons();
};

LevelPage.prototype._createLevelButtons = function () {
    var total = this._levelModel.length;

    var template = document.createElement("li");
    template.className = "button";

    var list = DOMTree.get(R.LevelPage.LevelList);
    list.innerHTML = ""; // Remove children elements
    this._levelButtons.length = 0;

    for (var i = 0; i < total; i++) {
        var element = template.cloneNode();
        element.textContent = (i+1) + "";

        this._levelButtons[i] = new Button(element, this._onLevelClicked.bind(this, i));

        list.appendChild(element);
    }
};

LevelPage.prototype._onLevelClicked = function (level) {
    this.goTo("game-page", Component.TransitionType.SlideOutLeft,
            Component.TransitionType.SlideInRight, this._levelModel[level]);
};

LevelPage.prototype._onBackPressed = function () {
    this.goTo("home-page", Component.TransitionType.SlideOutRight,
            Component.TransitionType.SlideInLeft, this._levelModel);
};
