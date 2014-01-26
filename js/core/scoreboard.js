var ScoreBoard = function (score) {
    this._score = score || 0;
    this._multiplier = 1;
    this._scoreChangedDispatcher = new EventDispatcher();
};

ScoreBoard.prototype.score = function() {
    return this._score;
};

ScoreBoard.prototype.lightBoxBlockDestroyed = function() {
    this._subtractScore(2 * this._multiplier);
    this._multiplier = this._multiplier * 2;
};

ScoreBoard.prototype.wallBlockDestroyed = function() {
    this._subtractScore(1 * this._multiplier);
};

ScoreBoard.prototype._subtractScore = function(value) {
    this._setScore(this._score - value);
};

ScoreBoard.prototype._setScore = function(score) {
    if (this._score === score)
        return;

    if (score < 0)
        score = 0;
    var oldScore = this._score;
    this._score = score;
    this._scoreChangedDispatcher.dispatch(oldScore, score);
};

ScoreBoard.prototype.addScoreChangedEventListener = function(listener) {
    this._scoreChangedDispatcher.addListener(listener);
};

ScoreBoard.prototype.removeScoreChangedEventListener = function(listener) {
    this._scoreChangedDispatcher.removeListener(listener);
};
