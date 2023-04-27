import { Vector2, Point } from "./Vector2.js";
/** A 2D axis-aligned bounding box (AABB). */
export interface Rectangle {
    /** The position of the AABB. (Top-left corner if `x` and `y` of `size` are both >= `0`) */
    pos: Point;
    /** The size of the AABB. */
    size: Point;
}
/** The bounds of a rectangle. */
export interface RectBounds {
    /** The Y coordinate of the top-most edge of an AABB. */
    top: number;
    /** The Y coordinate of the bottom-most edge of an AABB. */
    bottom: number;
    /** The X coordinate of the left-most edge of an AABB. */
    left: number;
    /** The X coordinate of the right-most edge of an AABB. */
    right: number;
}
/** Comparison data between two AABB's. */
export interface RectComparisonData {
    /** The shortest distance between vertical (left/right) edges of the two AABB's. */
    closestXDist: number;
    /** The shortest distance between horizontal (top/bottom) edges of the two AABB's */
    closestYDist: number;
    /** The distance between the left of the AABB and the right of the other AABB */
    leftSpace: number;
    /** The distance between the right of the AABB and the left of the other AABB */
    rightSpace: number;
    /** The distance between the top of the AABB and the bottom of the other AABB */
    topSpace: number;
    /** The distance between the bottom of the AABB and the top of the other AABB */
    bottomSpace: number;
    /** Whether or not the two AABBs are insersecting in the x direction. */
    xIntersection: boolean;
    /** Whether or not the two AABBs are insersecting in the y direction. */
    yIntersection: boolean;
    /** Whether or not the two AABB's intersecting area is positive. */
    overlapping: boolean;
}
/** A 2D axis-aligned bounding box (AABB). Includes extra methods for math and utility. */
export declare class Rect2 implements Rectangle {
    /** The position of the rectangle. (Top-left corner if `x` and `y` of `size` are both >= `0`) */
    pos: Vector2;
    /** The size of the rectangle. */
    size: Vector2;
    constructor(pos: Vector2, size: Vector2);
    /** Creates a `Rect2` from `x`, `y`, `width`, and `height` numbers instead of `pos` and `size` */
    static xywh(x: number, y: number, width: number, height: number): Rect2;
    /** Returns a copy of the `Rect2`. Also clones properties. */
    get copy(): Rect2;
    /** Sets the position and size of the `Rect2` to another `Rect2`. */
    set(r: Rect2): Rect2;
    /** Translates the `Rect2` by a point. Creates a new `Rect2` and does not modify the original `Rect2`. */
    translate(v: Point): Rect2;
    /** Translates the `Rect2` by a point. Modifies the original `Rect2`. */
    translateAssign(v: Point): Rect2;
    /** Scales the `Rect2` by a scale factor. Creates a new `Rect2` and does not modify the original `Rect2`. */
    scale(f: number): Rect2;
    /** Scales the `Rect2` by a scale factor. Modifies the original `Rect2`. */
    scaleAssign(f: number): Rect2;
    /** Expands the size of the `Rect2` by a number equally on all sides. Creates a new `Rect2` and does not modify the original `Rect2`. */
    expand(px: number): Rect2;
    /** Expands the size of the `Rect2` by a number equally on all sides. Modifies the original `Rect2`. */
    expandAssign(px: number): Rect2;
    /** Returns the area of the `Rect2`. */
    get area(): number;
    /** Returns the perimeter of the `Rect2`. */
    get perimeter(): number;
    /** Returns the `RectBounds` of the `Rect2`. */
    get bounds(): RectBounds;
    /** Returns if the `Rect2` overlaps another `Rect2`. */
    overlap(rect: Rect2): boolean;
    /** Returns if a point is inside the `Rect2`. */
    inside(p: Point): boolean;
    /** Returns the `RectComparisonData` of the `Rect2` and another `Rect2`. */
    comparisonData(rect: Rect2): RectComparisonData;
    /** Converts the `Rect2` from world coordinates to screen coordinates using the `currentCamera`. */
    get screen(): Rect2;
    /** Converts the `Rect2` from screen coordinates to world coordinates using the `currentCamera`. */
    get world(): Rect2;
}
