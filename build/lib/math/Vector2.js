/**
 * A point in 2D space using a cartesian coordinate system. Includes extra methods for math and utility.
 *
 * -X is left.
 * +X is right.
 * -Y is up.
 * +Y is down.
 */
export class Vector2 {
    /** The x coordinate of a 2D point. */
    x;
    /** The y coordinate of a 2D point. */
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    /** Returns a copy of the `Vector2`. */
    get copy() {
        return new Vector2(this.x, this.y);
    }
    /** Returns the square of the distance from the origin to the `Vector2`. Faster than `dist()`. */
    get distSquared() {
        return this.x * this.x + this.y * this.y;
    }
    /** Returns the distance from the origin to the `Vector2`. */
    get dist() {
        return Math.sqrt(this.distSquared);
    }
    /** Returns the clockwise angle in radians from the x-axis to the `Vector2`. */
    get rad() {
        return Math.atan2(this.y, this.x);
    }
    /** Returns the clockwise angle in degrees from the x-axis to the `Vector2`. */
    get deg() {
        return this.rad * 180 / Math.PI;
    }
    /** Converts the `Vector2` to a `PolarCoordinate`. */
    get polar() {
        return {
            dist: this.dist,
            rad: this.rad
        };
    }
    /** Converts a `PolarCoordinate` into a `Vector2`. */
    static fromPolar({ dist, rad }) {
        return new Vector2(dist * Math.cos(rad), dist * Math.sin(rad));
    }
    /** Sets the position of the `Vector2` to another `Vector2`. */
    set(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    /** Adds a point to the `Vector2`. Creates a new `Vector2` and does not modify the original `Vector2`. */
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    /** Adds a point to the `Vector2`. Modifies the original `Vector2`. */
    addAssign(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    /** Subtracts a point from the `Vector2`. Creates a new `Vector2` and does not modify the original `Vector2`. */
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    /** Subtracts a point from the `Vector2`. Modifies the original `Vector2`. */
    subAssign(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /** Scales the `Vector2` by a number. Creates a new `Vector2` and does not modify the original `Vector2`. */
    scale(f) {
        return new Vector2(this.x * f, this.y * f);
    }
    /** Scales the `Vector2` by a number. Modifies the original `Vector2`. */
    scaleAssign(f) {
        this.x *= f;
        this.y *= f;
        return this;
    }
    /** Rotates the `Vector2` around the origin by a clockwise angle in radians. Creates a new `Vector2` and does not modify the original `Vector2`. */
    rotate(rad) {
        const p = this.polar;
        p.rad += rad;
        return Vector2.fromPolar(p);
    }
    /** Rotates the `Vector2` around the origin by a clockwise angle in radians. Modifies the original `Vector2`. */
    rotateAssign(rad) {
        return this.set(this.rotate(rad));
    }
    /** Rotates the `Vector2` around the origin by a clockwise angle in degrees. Creates a new `Vector2` and does not modify the original `Vector2`. */
    rotateDeg(deg) {
        return this.rotate(deg * Math.PI / 180);
    }
    /** Rotates the `Vector2` around the origin by a clockwise angle in degrees. Modifies the original `Vector2`. */
    rotateDegAssign(deg) {
        return this.set(this.rotateDeg(deg));
    }
    /** Rotates the `Vector2` around another point by a clockwise angle in radians. Creates a new `Vector2` and does not modify the original `Vector2`. */
    rotateAround(p, rad) {
        return this.sub(p).rotate(rad).addAssign(p);
    }
    /** Rotates the `Vector2` around another point by a clockwise angle in radians. Modifies the original `Vector2`. */
    rotateAroundAssign(p, rad) {
        return this.subAssign(p).rotateAssign(rad).addAssign(p);
    }
    /** Rotates the `Vector2` around another point by a clockwise angle in degrees. Creates a new `Vector2` and does not modify the original `Vector2`. */
    rotateAroundDeg(p, deg) {
        return this.sub(p).rotateDeg(deg).addAssign(p);
    }
    /** Rotates the `Vector2` around another point by a clockwise angle in degrees. Modifies the original `Vector2`. */
    rotateAroundDegAssign(p, deg) {
        return this.subAssign(p).rotateDegAssign(deg).addAssign(p);
    }
    /** The scale factor required to normalize the `Vector2`. Returns `1` if the distance from the origin is `0`. */
    get normalizationFactor() {
        return this.distSquared != 0 ? 1 / this.dist : 1;
    }
    /** Normalizes the `Vector2`. Creates a new `Vector2` and does not modify the original `Vector2`. */
    get normalized() {
        return this.scale(this.normalizationFactor);
    }
    /** Normalizes the `Vector2`. Modifies the original `Vector2`. */
    normalize() {
        return this.scaleAssign(this.normalizationFactor);
    }
    /** Returns a normalized `Vector2` representing the direction from the `Vector2` to a point. */
    directionTo(v) {
        return this.neg.addAssign(v).normalize();
    }
    /** Returns the clockwise angle in radians from the `Vector2` to a point. */
    radTo(v) {
        return Math.atan2(this.y - v.y, this.x - v.x);
    }
    /** Returns the clockwise angle in degrees from the `Vector2` to a point. */
    degTo(v) {
        return this.radTo(v) * 180 / Math.PI;
    }
    /** Returns the square of the distance from the `Vector2` to a point. Faster than `distTo()`. */
    distSquaredTo(v) {
        const x = this.x - v.x;
        const y = this.y - v.y;
        return x * x + y * y;
    }
    /** Returns the distance from the `Vector2` to a point. */
    distTo(v) {
        return Math.sqrt(this.distSquaredTo(v));
    }
    /** Moves the `Vector2` towards another point by a specified distance. Creates a new `Vector2` and does not modify the original `Vector2`. */
    towards(dist, v) {
        return this.add(this.directionTo(v).scaleAssign(dist));
    }
    /** Moves the `Vector2` towards another point by a specified distance. Modifies the original `Vector2`. */
    towardsAssign(dist, v) {
        return this.addAssign(this.directionTo(v).scaleAssign(dist));
    }
    /** Returns a random `Vector2` between (0, 0) (inclusive) and (1, 1) (exclusive). */
    static get random() {
        return new Vector2(Math.random(), Math.random());
    }
    /** Converts the `Vector2` to just `x` and `y` coordinates. */
    get raw() {
        return {
            x: this.x,
            y: this.y
        };
    }
    /** Converts a point to a `Vector2`. */
    static fromRaw({ x, y }) {
        return new Vector2(x, y);
    }
    /** Returns the string form of a `Vector2` in the form (x, y). Same as `toString()`. */
    get string() {
        return `(${this.x}, ${this.y})`;
    }
    /** Returns the string form of a `Vector2` in the form (x, y). Same as the `string` property. */
    toString() {
        return this.string;
    }
    /** Returns the dot product of the `Vector2` and a point. */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    /** Sets the `x` and `y` coordinates of the `Vector2` to `0`. */
    reset() {
        this.x = 0;
        this.y = 0;
        return this;
    }
    /** Returns a new `Vector2` at (0, 0) */
    static get zero() {
        return new Vector2();
    }
    /** Returns a new `Vector2` at (0, -1) */
    static get up() {
        return new Vector2(0, -1);
    }
    /** Returns a new `Vector2` at (0, 1) */
    static get down() {
        return new Vector2(0, 1);
    }
    /** Returns a new `Vector2` at (-1, 0) */
    static get left() {
        return new Vector2(-1, 0);
    }
    /** Returns a new `Vector2` at (1, 0) */
    static get right() {
        return new Vector2(1, 0);
    }
    /** Negates the `x` and `y` of the `Vector2`. Creates a new `Vector2` and does not modify the original `Vector2`. */
    get neg() {
        return this.scale(-1);
    }
    /** Negates the `x` and `y` of the `Vector2`. Modifies the original `Vector2`. */
    negAssign() {
        return this.scaleAssign(-1);
    }
    /** Takes the absolute value of the `x` and `y` of the `Vector2`. Creates a new `Vector2` and does not modify the original `Vector2`. */
    get abs() {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }
    /** Takes the absolute value of the `x` and `y` of the `Vector2`. Modifies the original `Vector2`. */
    absAssign() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
}
