/**
 * A point in 2D space using a cartesian coordinate system.
 *
 * -X is left.
 * +X is right.
 * -Y is up.
 * +Y is down.
 */
export interface Point {
    /** The x coordinate of a 2D point. */
    x: number;
    /** The y coordinate of a 2D point. */
    y: number;
}
/** A point in 2D space using a polar coordinate system. */
export interface PolarCoordinate {
    /** The distance from the origin to the 2D point. */
    dist: number;
    /** The clockwise angle in radians from the x-axis to the 2D point. */
    rad: number;
}
/**
 * A point in 2D space using a cartesian coordinate system. Includes extra methods for math and utility.
 *
 * -X is left.
 * +X is right.
 * -Y is up.
 * +Y is down.
 */
export declare class Vector2 implements Point {
    /** The x coordinate of a 2D point. */
    x: number;
    /** The y coordinate of a 2D point. */
    y: number;
    constructor(x?: number, y?: number);
    /** Returns a copy of the `Vector2`. */
    get copy(): Vector2;
    /** Returns the square of the distance from the origin to the `Vector2`. Faster than `dist()`. */
    get distSquared(): number;
    /** Returns the distance from the origin to the `Vector2`. */
    get dist(): number;
    /** Returns the clockwise angle in radians from the x-axis to the `Vector2`. */
    get rad(): number;
    /** Returns the clockwise angle in degrees from the x-axis to the `Vector2`. */
    get deg(): number;
    /** Converts the `Vector2` to a `PolarCoordinate`. */
    get polar(): PolarCoordinate;
    /** Converts a `PolarCoordinate` into a `Vector2`. */
    static fromPolar({ dist, rad }: PolarCoordinate): Vector2;
    /** Sets the position of the `Vector2` to another `Vector2`. */
    set(v: Point): Vector2;
    /** Adds a point to the `Vector2`. Creates a new `Vector2` and does not modify the original `Vector2`. */
    add(v: Point): Vector2;
    /** Adds a point to the `Vector2`. Modifies the original `Vector2`. */
    addAssign(v: Point): Vector2;
    /** Subtracts a point from the `Vector2`. Creates a new `Vector2` and does not modify the original `Vector2`. */
    sub(v: Point): Vector2;
    /** Subtracts a point from the `Vector2`. Modifies the original `Vector2`. */
    subAssign(v: Point): Vector2;
    /** Scales the `Vector2` by a number. Creates a new `Vector2` and does not modify the original `Vector2`. */
    scale(f: number): Vector2;
    /** Scales the `Vector2` by a number. Modifies the original `Vector2`. */
    scaleAssign(f: number): Vector2;
    /** Rotates the `Vector2` around the origin by a clockwise angle in radians. Creates a new `Vector2` and does not modify the original `Vector2`. */
    rotate(rad: number): Vector2;
    /** Rotates the `Vector2` around the origin by a clockwise angle in radians. Modifies the original `Vector2`. */
    rotateAssign(rad: number): Vector2;
    /** Rotates the `Vector2` around the origin by a clockwise angle in degrees. Creates a new `Vector2` and does not modify the original `Vector2`. */
    rotateDeg(deg: number): Vector2;
    /** Rotates the `Vector2` around the origin by a clockwise angle in degrees. Modifies the original `Vector2`. */
    rotateDegAssign(deg: number): Vector2;
    /** Rotates the `Vector2` around another point by a clockwise angle in radians. Creates a new `Vector2` and does not modify the original `Vector2`. */
    rotateAround(p: Point, rad: number): Vector2;
    /** Rotates the `Vector2` around another point by a clockwise angle in radians. Modifies the original `Vector2`. */
    rotateAroundAssign(p: Point, rad: number): Vector2;
    /** Rotates the `Vector2` around another point by a clockwise angle in degrees. Creates a new `Vector2` and does not modify the original `Vector2`. */
    rotateAroundDeg(p: Point, deg: number): Vector2;
    /** Rotates the `Vector2` around another point by a clockwise angle in degrees. Modifies the original `Vector2`. */
    rotateAroundDegAssign(p: Point, deg: number): Vector2;
    /** The scale factor required to normalize the `Vector2`. Returns `1` if the distance from the origin is `0`. */
    get normalizationFactor(): number;
    /** Normalizes the `Vector2`. Creates a new `Vector2` and does not modify the original `Vector2`. */
    get normalized(): Vector2;
    /** Normalizes the `Vector2`. Modifies the original `Vector2`. */
    normalize(): Vector2;
    /** Returns a normalized `Vector2` representing the direction from the `Vector2` to a point. */
    directionTo(v: Point): Vector2;
    /** Returns the clockwise angle in radians from the `Vector2` to a point. */
    radTo(v: Point): number;
    /** Returns the clockwise angle in degrees from the `Vector2` to a point. */
    degTo(v: Point): number;
    /** Returns the square of the distance from the `Vector2` to a point. Faster than `distTo()`. */
    distSquaredTo(v: Point): number;
    /** Returns the distance from the `Vector2` to a point. */
    distTo(v: Point): number;
    /** Moves the `Vector2` towards another point by a specified distance. Creates a new `Vector2` and does not modify the original `Vector2`. */
    towards(dist: number, v: Point): Vector2;
    /** Moves the `Vector2` towards another point by a specified distance. Modifies the original `Vector2`. */
    towardsAssign(dist: number, v: Point): Vector2;
    /** Returns a random `Vector2` between (0, 0) (inclusive) and (1, 1) (exclusive). */
    static get random(): Vector2;
    /** Converts the `Vector2` to just `x` and `y` coordinates. */
    get raw(): Point;
    /** Converts a point to a `Vector2`. */
    static fromRaw({ x, y }: Point): Vector2;
    /** Returns the string form of a `Vector2` in the form (x, y). Same as `toString()`. */
    get string(): string;
    /** Returns the string form of a `Vector2` in the form (x, y). Same as the `string` property. */
    toString(): string;
    /** Returns the dot product of the `Vector2` and a point. */
    dot(v: Point): number;
    /** Sets the `x` and `y` coordinates of the `Vector2` to `0`. */
    reset(): Vector2;
    /** Returns a new `Vector2` at (0, 0) */
    static get zero(): Vector2;
    /** Returns a new `Vector2` at (0, -1) */
    static get up(): Vector2;
    /** Returns a new `Vector2` at (0, 1) */
    static get down(): Vector2;
    /** Returns a new `Vector2` at (-1, 0) */
    static get left(): Vector2;
    /** Returns a new `Vector2` at (1, 0) */
    static get right(): Vector2;
    /** Negates the `x` and `y` of the `Vector2`. Creates a new `Vector2` and does not modify the original `Vector2`. */
    get neg(): Vector2;
    /** Negates the `x` and `y` of the `Vector2`. Modifies the original `Vector2`. */
    negAssign(): Vector2;
    /** Takes the absolute value of the `x` and `y` of the `Vector2`. Creates a new `Vector2` and does not modify the original `Vector2`. */
    get abs(): Vector2;
    /** Takes the absolute value of the `x` and `y` of the `Vector2`. Modifies the original `Vector2`. */
    absAssign(): Vector2;
}
