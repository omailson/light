/**
 * An opaque object
 *
 * @class Opaque
 * @param p1 {Object} An edge of the object
 * @param p2 {Object} Another edge of the object
 */
var Opaque = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
};

/**
 * Paint the object to a context
 *
 * @method paint
 * @param context {CanvasRenderingContext2D} A canvas 2D context
 */
Opaque.prototype.paint = function (context) {
    context.save();
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.p1.x, this.p1.y);
    context.lineTo(this.p2.x, this.p2.y);
    context.stroke();
    context.restore();
};
