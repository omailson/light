/**
 * This class represents a source of light
 *
 * @class Light
 * @param startRay {Ray} A Ray limiting the Light bean
 * @param endRay {Ray} Another Ray limiting the Light bean
 */
var Light = function (startRay, endRay) {
    this.startRay = startRay;
    this.endRay = endRay;
    this.rays = [];

    // XXX
    this.pos = startRay.commonSource(endRay);
};
