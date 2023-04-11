import { currentCamera } from "../render/Camera.js";
import { Vector2, Point } from "./Vector2.js";

export interface Rectangle {
    pos: Point,
    size: Point
}

export interface RectBounds {
    top: number,
    bottom: number,
    left: number,
    right: number
}

export interface RectComparisonData {
    closestXDist: number,
    closestYDist: number,
    overlapping: boolean
}

export class Rect2 implements Rectangle {
    pos: Vector2;
    size: Vector2;

    constructor(pos: Vector2, size: Vector2) {
        this.pos = pos.copy;
        this.size = size.copy;
    }

    static xywh(x: number, y: number, width: number, height: number): Rect2 {
        return new Rect2(new Vector2(x, y), new Vector2(width, height));
    }

    get copy(): Rect2 {
        return new Rect2(this.pos.copy, this.size.copy);
    }
    
    set(r: Rect2) {
        this.pos = r.pos;
        this.size = r.size;
        return this;
    }

    translate(v: Point): Rect2 {
        return new Rect2(this.pos.add(v), this.size.copy);
    }

    translateAssign(v: Point): Rect2 {
        this.pos.addAssign(v);
        return this;
    }

    scale(f: number): Rect2 {
        return new Rect2(this.pos.copy, this.size.scale(f));
    }

    scaleAssign(f: number): Rect2 {
        this.size.scaleAssign(f);
        return this;
    }

    expand(px: number): Rect2 {
        return new Rect2(this.pos.sub({ x: px, y: px }), this.size.add({ x: px * 2, y: px * 2 }));
    }

    expandAssign(px: number): Rect2 {
        this.pos.subAssign({ x: px, y: px });
        this.size.addAssign({ x: px * 2, y: px * 2 });
        return this;
    }

    get area(): number {
        return this.size.x * this.size.y;
    }

    get perimeter(): number {
        return this.size.x * 2 + this.size.y * 2;
    }

    get bounds(): RectBounds {
        return {
            top: this.size.y >= 0 ? this.pos.y : this.pos.y + this.size.y,
            bottom: this.size.y >= 0 ? this.pos.y + this.size.y : this.pos.y,
            left: this.size.x >= 0 ? this.pos.x : this.pos.x + this.size.x,
            right: this.size.x >= 0 ? this.pos.x + this.size.x : this.pos.x
        };
    }

    overlap(rect: Rect2): boolean {
        const b1: RectBounds = this.bounds;
        const b2: RectBounds = rect.bounds;

        return b1.left < b2.right && b1.right > b2.left && b1.top < b2.bottom && b1.bottom > b2.top;
    }

    inside(p: Point): boolean {
        const b: RectBounds = this.bounds;
        return p.x >= b.left && p.x <= b.right && p.y >= b.top && p.y <= b.bottom;
    }

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

    get screen(): Rect2 {
        return new Rect2(currentCamera.toScreen(this.pos), this.size.scale(currentCamera.zoom));
    }

    get world(): Rect2 {
        return new Rect2(currentCamera.toWorld(this.pos), this.size.scale(1 / currentCamera.zoom));
    }
}