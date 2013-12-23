/**
 * This class represents a source of light
 *
 * @class Light
 * @param startRay {Ray} A Ray limiting the Light bean
 * @param endRay {Ray} Another Ray limiting the Light bean
 */
var Light = function (startRay, endRay) {
    this.pos = null;
    this.setRays(startRay, endRay);
    this.rays = [];
};

/**
 * The first ray of light
 *
 * @method startRay
 * @return {Ray}
 */
Light.prototype.startRay = function () {
    return this._startRay;
};

/**
 * The last ray of light
 *
 * @method endRay
 * @return {Ray}
 */
Light.prototype.endRay = function () {
    return this._endRay;
};

/**
 * Set first and last rays. Pass null if you want to change only one value
 *
 * @method setRays
 * @param startRay {Ray}
 * @param endRay {Ray}
 */
Light.prototype.setRays = function (startRay, endRay) {
    this._startRay = startRay || this._startRay;
    this._endRay = endRay || this._endRay;

    this.pos = this._startRay.commonSource(this._endRay);
};
