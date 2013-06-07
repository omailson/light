/*global MathHelper*/

/**
 * Two dimensional vector
 *
 * @class Vector2D
 * @module utils
 * @constructor
 * @param x {Number} X property
 * @param y {Number} Y property
 */
var Vector2D = function (x, y) {
    /**
     * The X coordinate
     *
     * @property x
     * @type Number
     * @default 0
     */
    this.x = x || 0;

    /**
     * The Y coordinate
     *
     * @property y
     * @type Number
     * @default 0
     */
    this.y = y || 0;
};

/**
 * Check whether this is a null vector, i.e. its coordinates are 0
 *
 * @method isNull
 * @return {Boolean} if the vector is a null vector
 */
Vector2D.prototype.isNull = function () {
    return this.x === 0 && this.y === 0;
};

/**
 * Same as vector.length() * vector.length()
 * lengthSquared = x * x + y * y
 *
 * @method lengthSquared
 * @return {Number} the length squared
 */
Vector2D.prototype.lengthSquared = function () {
    return this.x * this.x + this.y * this.y;
};

/**
 * Computes the magnitude of the vector
 *
 * @method length
 * @return {Number} magnitude of the vector
 */
Vector2D.prototype.length = function () {
    return Math.sqrt(this.lengthSquared());
};

/**
 * Sets the magnitude of the vector to 1
 *
 * @method normalize
 * @return {vector2d} vector with magnitude equals to 1
 */
Vector2D.prototype.normalize = function () {
    var magnitude = this.length();
    this.x /= magnitude;
    this.y /= magnitude;
};

/**
 * returns the vector but with length equals to 1
 *
 * @method normalized
 * @return {vector2d} vector with magnitude equals to 1
 */
Vector2D.prototype.normalized = function () {
    var newVector = new Vector2D(this.x, this.y);
    newVector.normalize();
    return newVector;
};

/**
 * Rotation operation (static)
 *
 * @method rotate
 * @static
 * @param angle {Number} rotation angle (radians)
 * @return {Vector2D} rotated vector
 */
Vector2D.rotate = function (vector, angle) {
    var newVector = new Vector2D(vector.x, vector.y);
    newVector.rotate(angle);
    return newVector;
};

/**
 * Rotation operation (non-static)
 *
 * @method rotate
 * @param angle {Number} rotation angle (radians)
 */
Vector2D.prototype.rotate = function (angle) {
    if (angle === 0)
        return;

    var tempX = this.x;
    this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    this.y = this.y * Math.cos(angle) + tempX * Math.sin(angle);
};

/**
 * 90 degrees rotation operation (static)
 *
 * @method rotate90
 * @static
 * @param angle {Number} rotation angle (radians)
 * @return {Vector2D} rotated vector
 */
Vector2D.rotate90 = function (vector) {
    var newVector = new Vector2D(vector.x, vector.y);
    newVector.rotate90();
    return newVector;
};

/**
 * 90 degrees rotation operation (non-static)
 *
 * @method rotate90
 */
Vector2D.prototype.rotate90 = function () {
    var tempX = this.x;
    this.x = -this.y;
    this.y = tempX;
};

/**
 * Add Operation (non-static)
 *
 * @method add
 * @param vector {Vector2D} vector to sum with
 */
Vector2D.prototype.add = function (vector) {
    this.x += vector.x;
    this.y += vector.y;
};

/**
 * Add Operation (static)
 *
 * @method add
 * @static
 * @param vecA {Vector2D} left vector
 * @param vecB {Vector2D} right vector
 * @return {Vector2D} sum of vecA and vecB
 */
Vector2D.add = function (vecA, vecB) {
    var newVector = new Vector2D(vecA.x, vecA.y);
    newVector.add(vecB);
    return newVector;
};

/**
 * Sub Operation (non-static)
 *
 * @method sub
 * @param vector {Vector2D} vector to sub
 */
Vector2D.prototype.sub = function (vector) {
    this.x -= vector.x;
    this.y -= vector.y;
};

/**
 * Sub Operation (static)
 *
 * @method sub
 * @static
 * @param vecA {Vector2D} left vector
 * @param vecB {Vector2D} right vector
 * @return {Vector2D} vecA - vecB
 */
Vector2D.sub = function (vecA, vecB) {
    var newVector = new Vector2D(vecA.x, vecA.y);
    newVector.sub(vecB);
    return newVector;
};

/**
 * Scalar multiplication (non-static)
 *
 * @method scalarMult
 * @param scalar {Number} scalar value
 */
Vector2D.prototype.scalarMult = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
};

/**
 * Scalar multiplication (static)
 *
 * @method scalarMult
 * @static
 * @param vector {Vector2D} the 2d vector
 * @param scalar {Number} scalar value
 * @return {Vector2D} k * vector
 */
Vector2D.scalarMult = function (vector, scalar) {
    var newVector = new Vector2D(vector.x, vector.y);
    newVector.scalarMult(scalar);
    return newVector;
};

/**
 * Scalar division (non-static)
 *
 * @method scalarDiv
 * @param scalar {Number} scalar value
 */
Vector2D.prototype.scalarDiv = function (scalar) {
    this.x /= scalar;
    this.y /= scalar;
};

/**
 * Scalar division (static)
 *
 * @method scalarDiv
 * @static
 * @param vector {Vector2D} the 2d vector
 * @param scalar {Number} scalar value
 * @return {Vector2D} vector / k
 */
Vector2D.scalarDiv = function (vector, scalar) {
    var newVector = new Vector2D(vector.x, vector.y);
    newVector.scalarDiv(scalar);
    return newVector;
};

/**
 * Performs a component product on this vector
 *
 * @method componentProduct
 * @param vector {Vector2D} the operand vector
 */
Vector2D.prototype.componentProduct = function (vector) {
    this.x *= vector.x;
    this.y *= vector.y;
};

/**
 * Performs a component product between two vectors and return the result
 *
 * @method componentProduct
 * @param a {Vector2D}
 * @param b {Vector2D}
 * @return {Vector2D} a o b
 */
Vector2D.componentProduct = function (a, b) {
    var newVector = new Vector2D(a.x, a.y);
    newVector.componentProduct(b);
    return newVector;
};

/**
 * Returns true if the difference between vectors `a` and `b` coordinates are less of equal than
 * the passed `threshold`
 *
 * @method vectorThresholdCompare
 * @static
 * @param a {Vector2D}
 * @param b {Vector2D}
 * @param threshold {Number}
 * @return {Boolean} If the vectors difference are less or equal the threshold
 */
Vector2D.thresholdCompare = function (a, b, threshold) {
    return MathHelper.thresholdCompare(a.x, b.x, threshold) && MathHelper.thresholdCompare(a.y, b.y, threshold);
};

/**
 * Returns true if the difference between this vector and vector `a` coordinates are less of equal than
 * the passed `threshold`
 *
 * @method vectorThresholdCompare
 * @static
 * @param a {Vector2D}
 * @param threshold {Number}
 * @return {Boolean} If the vectors difference are less or equal the threshold
 */
Vector2D.prototype.thresholdCompare = function (a, threshold) {
    return Vector2D.thresholdCompare(this, a, threshold);
};

/**
 * Dot product
 *
 * Algebraically, it is the sum of the products of the
 * corresponding entries of the two sequences of numbers.
 *
 * Geometrically, it is the product of the magnitudes of
 * the two vectors and the cosine of the angle between them.
 *
 * @method dotProduct
 * @static
 * @param vecA {Vector2D} first vector
 * @param vecB {Vector2D} second vector
 * @return {Vector2D} vecA.vecB
 */
Vector2D.dotProduct = function (vecA, vecB) {
    return vecA.x * vecB.x + vecA.y * vecB.y;
};

/**
 * Projection of 2d vectors
 *
 * The vector projection of a vector a on (or onto) a nonzero
 * vector b (also known as the vector component or vector
 * resolute of a in the direction of b) is the orthogonal
 * projection of a onto a straight line parallel to b.
 *
 * @method project
 * @static
 * @param vecA {Vector2D} first vector
 * @param vecB {Vector2D} second vector
 * @return {Vector2D} vecA projected onto vecB
 */
Vector2D.project = function (vecA, vecB) {
    var dot = Vector2D.dotProduct(vecA, vecB);
    var vecB1 = Vector2D.scalarMult(vecB, dot);
    var vecB2 = Vector2D.scalarDiv(vecB1, vecB.lengthSquared());
    return vecB2;
};

/**
 * Reflection of a vector
 *
 * The operation of exchanging all points of a mathematical
 * object with their mirror images (i.e., reflections in a mirror).
 *
 * @method reflect
 * @static
 * @param vector {Vector2D} vector to reflect
 * @param normal {Vector2D} surface normal
 * @return {Vector2D} reflected vector
 */
Vector2D.reflect = function (vector, normal) {
    var proj = Vector2D.project(vector, normal);
    var vec1 = Vector2D.sub(vector, proj);
    var vec2 = Vector2D.scalarMult(vec1, 2);
    var vec3 = Vector2D.sub(vector, vec2);
    return vec3;
};

/**
 * The norm of the cross product between this vector and a given vector
 *
 * @method crossProduct
 * @param v {Vector2D} the other vector to compute the cross product
 * @return {Number} the magnitude of the resulting vector
 */
Vector2D.prototype.crossProduct = function (v) {
    return this.x*v.y - this.y*v.x;
};
