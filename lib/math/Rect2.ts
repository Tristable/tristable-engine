import { currentCamera } from "../render/Camera.js";
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

    /** Whether or not the two AABB's intersecting area is positive. */
    overlapping: boolean;
}

/** A 2D axis-aligned bounding box (AABB). Includes extra methods for math and utility. */
export class Rect2 implements Rectangle {
    /** The position of the rectangle. (Top-left corner if `x` and `y` of `size` are both >= `0`) */
    pos: Vector2;
    
    /** The size of the rectangle. */
    size: Vector2;

    constructor(pos: Vector2, size: Vector2) {
        this.pos = pos.copy;
        this.size = size.copy;
    }

    /** Creates a `Rect2` from `x`, `y`, `width`, and `height` numbers instead of `pos` and `size` */
    static xywh(x: number, y: number, width: number, height: number): Rect2 {
        return new Rect2(new Vector2(x, y), new Vector2(width, height));
    }

    /** Returns a copy of the `Rect2`. Also clones properties. */
    get copy(): Rect2 {
        return new Rect2(this.pos.copy, this.size.copy);
    }
    
    /** Sets the position and size of the `Rect2` to another `Rect2`. */
    set(r: Rect2) {
        this.pos = r.pos;
        this.size = r.size;
        return this;
    }

    /** Translates the `Rect2` by a point. Creates a new `Rect2` and does not modify the original `Rect2`. */
    translate(v: Point): Rect2 {
        return new Rect2(this.pos.add(v), this.size.copy);
    }

    /** Translates the `Rect2` by a point. Modifies the original `Rect2`. */
    translateAssign(v: Point): Rect2 {
        this.pos.addAssign(v);
        return this;
    }

    /** Scales the `Rect2` by a scale factor. Creates a new `Rect2` and does not modify the original `Rect2`. */
    scale(f: number): Rect2 {
        return new Rect2(this.pos.copy, this.size.scale(f));
    }

    /** Scales the `Rect2` by a scale factor. Modifies the original `Rect2`. */
    scaleAssign(f: number): Rect2 {
        this.size.scaleAssign(f);
        return this;
    }

    /** Expands the size of the `Rect2` by a number equally on all sides. Creates a new `Rect2` and does not modify the original `Rect2`. */
    expand(px: number): Rect2 {
        return new Rect2(this.pos.sub({ x: px, y: px }), this.size.add({ x: px * 2, y: px * 2 }));
    }

    /** Expands the size of the `Rect2` by a number equally on all sides. Modifies the original `Rect2`. */
    expandAssign(px: number): Rect2 {
        this.pos.x -= px;
        this.pos.y -= px;
        this.size.x += px * 2;
        this.size.y += px * 2;
        return this;
    }

    /** Returns the area of the `Rect2`. */
    get area(): number {
        return this.size.x * this.size.y;
    }

    /** Returns the perimeter of the `Rect2`. */
    get perimeter(): number {
        return this.size.x * 2 + this.size.y * 2;
    }

    /** Returns the `RectBounds` of the `Rect2`. */
    get bounds(): RectBounds {
        return {
            top: this.size.y >= 0 ? this.pos.y : this.pos.y + this.size.y,
            bottom: this.size.y >= 0 ? this.pos.y + this.size.y : this.pos.y,
            left: this.size.x >= 0 ? this.pos.x : this.pos.x + this.size.x,
            right: this.size.x >= 0 ? this.pos.x + this.size.x : this.pos.x
        };
    }

    /** Returns if the `Rect2` overlaps another `Rect2`. */
    overlap(rect: Rect2): boolean {
        const b1: RectBounds = this.bounds;
        const b2: RectBounds = rect.bounds;

        return b1.left < b2.right && b1.right > b2.left && b1.top < b2.bottom && b1.bottom > b2.top;
    }

    /** Returns if a point is inside the `Rect2`. */
    inside(p: Point): boolean {
        const b: RectBounds = this.bounds;
        return p.x >= b.left && p.x <= b.right && p.y >= b.top && p.y <= b.bottom;
    }

    /** Returns the `RectComparisonData` of the `Rect2` and another `Rect2`. */
    comparisonData(rect: Rect2): RectComparisonData {
        const b1: RectBounds = this.bounds;
        const b2: RectBounds = rect.bounds;

        const closestXDist: number = Math.min(
            Math.abs(b1.left - b2.left),
            Math.abs(b1.left - b2.right),
            Math.abs(b1.right - b2.left),
            Math.abs(b1.right - b2.right)
        );

        const closestYDist: number = Math.min(
            Math.abs(b1.top - b2.top),
            Math.abs(b1.top - b2.bottom),
            Math.abs(b1.bottom - b2.top),
            Math.abs(b1.bottom - b2.bottom)
        );

        return {
            overlapping: this.overlap(rect),
            closestXDist,
            closestYDist
        };
    }

    /** Converts the `Rect2` from world coordinates to screen coordinates using the `currentCamera`. */
    get screen(): Rect2 {
        return new Rect2(currentCamera.toScreen(this.pos), this.size.scale(currentCamera.zoom));
    }

    /** Converts the `Rect2` from screen coordinates to world coordinates using the `currentCamera`. */
    get world(): Rect2 {
        return new Rect2(currentCamera.toWorld(this.pos), this.size.scale(1 / currentCamera.zoom));
    }
}