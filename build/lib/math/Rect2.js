import { currentCamera } from "../render/Camera.js";
import { Vector2 } from "./Vector2.js";
/** A 2D axis-aligned bounding box (AABB). Includes extra methods for math and utility. */
export class Rect2 {
    /** The position of the rectangle. (Top-left corner if `x` and `y` of `size` are both >= `0`) */
    pos;
    /** The size of the rectangle. */
    size;
    constructor(pos, size) {
        this.pos = pos.copy;
        this.size = size.copy;
    }
    /** Creates a `Rect2` from `x`, `y`, `width`, and `height` numbers instead of `pos` and `size` */
    static xywh(x, y, width, height) {
        return new Rect2(new Vector2(x, y), new Vector2(width, height));
    }
    /** Returns a copy of the `Rect2`. Also clones properties. */
    get copy() {
        return new Rect2(this.pos.copy, this.size.copy);
    }
    /** Sets the position and size of the `Rect2` to another `Rect2`. */
    set(r) {
        this.pos = r.pos;
        this.size = r.size;
        return this;
    }
    /** Translates the `Rect2` by a point. Creates a new `Rect2` and does not modify the original `Rect2`. */
    translate(v) {
        return new Rect2(this.pos.add(v), this.size.copy);
    }
    /** Translates the `Rect2` by a point. Modifies the original `Rect2`. */
    translateAssign(v) {
        this.pos.addAssign(v);
        return this;
    }
    /** Scales the `Rect2` by a scale factor. Creates a new `Rect2` and does not modify the original `Rect2`. */
    scale(f) {
        return new Rect2(this.pos.copy, this.size.scale(f));
    }
    /** Scales the `Rect2` by a scale factor. Modifies the original `Rect2`. */
    scaleAssign(f) {
        this.size.scaleAssign(f);
        return this;
    }
    /** Expands the size of the `Rect2` by a number equally on all sides. Creates a new `Rect2` and does not modify the original `Rect2`. */
    expand(px) {
        return new Rect2(this.pos.sub({ x: px, y: px }), this.size.add({ x: px * 2, y: px * 2 }));
    }
    /** Expands the size of the `Rect2` by a number equally on all sides. Modifies the original `Rect2`. */
    expandAssign(px) {
        this.pos.x -= px;
        this.pos.y -= px;
        this.size.x += px * 2;
        this.size.y += px * 2;
        return this;
    }
    /** Returns the area of the `Rect2`. */
    get area() {
        return this.size.x * this.size.y;
    }
    /** Returns the perimeter of the `Rect2`. */
    get perimeter() {
        return this.size.x * 2 + this.size.y * 2;
    }
    /** Returns the `RectBounds` of the `Rect2`. */
    get bounds() {
        return {
            top: this.size.y >= 0 ? this.pos.y : this.pos.y + this.size.y,
            bottom: this.size.y >= 0 ? this.pos.y + this.size.y : this.pos.y,
            left: this.size.x >= 0 ? this.pos.x : this.pos.x + this.size.x,
            right: this.size.x >= 0 ? this.pos.x + this.size.x : this.pos.x
        };
    }
    /** Returns if the `Rect2` overlaps another `Rect2`. */
    overlap(rect) {
        const b1 = this.bounds;
        const b2 = rect.bounds;
        return b1.left < b2.right && b1.right > b2.left && b1.top < b2.bottom && b1.bottom > b2.top;
    }
    /** Returns if a point is inside the `Rect2`. */
    inside(p) {
        const b = this.bounds;
        return p.x >= b.left && p.x <= b.right && p.y >= b.top && p.y <= b.bottom;
    }
    /** Returns the `RectComparisonData` of the `Rect2` and another `Rect2`. */
    comparisonData(rect) {
        const b1 = this.bounds;
        const b2 = rect.bounds;
        const closestXDist = Math.min(Math.abs(b1.left - b2.left), Math.abs(b1.left - b2.right), Math.abs(b1.right - b2.left), Math.abs(b1.right - b2.right));
        const closestYDist = Math.min(Math.abs(b1.top - b2.top), Math.abs(b1.top - b2.bottom), Math.abs(b1.bottom - b2.top), Math.abs(b1.bottom - b2.bottom));
        const xIntersection = b1.left < b2.right && b1.right > b2.left;
        const yIntersection = b1.top < b2.bottom && b1.bottom > b2.top;
        const leftSpace = yIntersection && b1.left >= b2.right ? Math.abs(b1.left - b2.right) : Infinity;
        const rightSpace = yIntersection && b1.right <= b2.left ? Math.abs(b1.right - b2.left) : Infinity;
        const topSpace = xIntersection && b1.top >= b2.bottom ? Math.abs(b1.top - b2.bottom) : Infinity;
        const bottomSpace = xIntersection && b1.bottom <= b2.top ? Math.abs(b1.bottom - b2.top) : Infinity;
        return {
            overlapping: xIntersection || yIntersection,
            closestXDist,
            closestYDist,
            leftSpace,
            rightSpace,
            topSpace,
            bottomSpace,
            xIntersection,
            yIntersection
        };
    }
    /** Converts the `Rect2` from world coordinates to screen coordinates using the `currentCamera`. */
    get screen() {
        return new Rect2(currentCamera.toScreen(this.pos), this.size.scale(currentCamera.zoom));
    }
    /** Converts the `Rect2` from screen coordinates to world coordinates using the `currentCamera`. */
    get world() {
        return new Rect2(currentCamera.toWorld(this.pos), this.size.scale(1 / currentCamera.zoom));
    }
}
