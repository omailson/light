var Fuzzy = {};

Fuzzy.Operator = {
    EQ: 1,
    LT: 2,
    GT: 4
};

/**
 * Returns true if numbers `a` and `b` are considered equal
 *
 * The two number are compared in a relative way
 *
 * Source: http://qt.gitorious.org/qt/qtbase/blobs/HEAD/src/corelib/global/qglobal.h#line786
 *
 * @method fuzzyCompare
 * @static
 * @param a {Number}
 * @param b {Number}
 * @param operator {Fuzzy.Operator} Comparison operator
 * @return {Boolean} If the numbers are considered equal or not
 */
Fuzzy.compare = function (a, b, operator) {
    if (!operator || operator === Fuzzy.Operator.EQ)
        return (Math.abs((1 + a) - (1 + b)) <= 0.000000000001 * Math.min(Math.abs(1 + a), Math.abs(1 + b)));

    var result = true;
    if (operator & Fuzzy.Operator.LT)
        result = result && a < b;
    
    if (operator & Fuzzy.Operator.GT)
        result = result && a > b;

    if (operator & Fuzzy.Operator.EQ)
        result = result || Fuzzy.compare(a, b);
    else
        result = result && !Fuzzy.compare(a, b);

    return result;
};

Fuzzy.eq = function (a, b) {
    return Fuzzy.compare(a, b, Fuzzy.Operator.EQ);
};

Fuzzy.lt = function (a, b) {
    return Fuzzy.compare(a, b, Fuzzy.Operator.LT);
};

Fuzzy.gt = function (a, b) {
    return Fuzzy.compare(a, b, Fuzzy.Operator.GT);
};

Fuzzy.lte = function (a, b) {
    return Fuzzy.compare(a, b, Fuzzy.Operator.LT | Fuzzy.Operator.EQ);
};

Fuzzy.gte = function (a, b) {
    return Fuzzy.compare(a, b, Fuzzy.Operator.GT | Fuzzy.Operator.EQ);
};

Fuzzy.between = function (min, value, max) {
    if (min > max) {
        var aux = max;
        max = min;
        min = aux;
    }

    return Fuzzy.lte(min, value) && Fuzzy.lte(value, max);
};
