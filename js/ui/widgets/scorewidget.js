var ScoreWidget = function () {
    Component.call(this, DOMTree.get(R.ScoreWidget));
    this._scoreValue = DOMTree.get(R.ScoreWidget.ScoreValue);
};

inherits(ScoreWidget, Component);

ScoreWidget.prototype.setScore = function(score) {
    this._scoreValue.textContent = score;
};
