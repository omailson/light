var ScoreWidget = function () {
    this.element = DOMTree.get(R.ScoreWidget);
    this._scoreValue = DOMTree.get(R.ScoreWidget.ScoreValue);
};

ScoreWidget.prototype.setScore = function(score) {
    this._scoreValue.textContent = score;
};
