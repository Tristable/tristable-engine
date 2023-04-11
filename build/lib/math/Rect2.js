import { currentCamera } from "../render/Camera.js";
import { Vector2 } from "./Vector2.js";
export class Rect2 {
    pos;
    size;
    constructor(pos, size) {
        this.pos = pos.copy;
        this.size = size.copy;
    }
    static xywh(x, y, width, height) {
        return new Rect2(new Vector2(x, y), new Vector2(width, height));
    }
    get copy() {
        return new Rect2(this.pos.copy, this.size.copy);
    }
    set(r) {
        this.pos = r.pos;
        this.size = r.size;
        return this;
    }
    translate(v) {
        return new Rect2(this.pos.add(v), this.size.copy);
    }
    translateAssign(v) {
        this.pos.addAssign(v);
        return this;
    }
    scale(f) {
        return new Rect2(this.pos.copy, this.size.scale(f));
    }
    scaleAssign(f) {
        this.size.scaleAssign(f);
        return this;
    }
    expand(px) {
        return new Rect2(this.pos.sub({ x: px, y: px }), this.size.add({ x: px * 2, y: px * 2 }));
    }
    expandAssign(px) {
        this.pos.subAssign({ x: px, y: px });
        this.size.addAssign({ x: px * 2, y: px * 2 });
        return this;
    }
    get area() {
        return this.size.x * this.size.y;
    }
    get perimeter() {
        return this.size.x * 2 + this.size.y * 2;
    }
    get bounds() {
        return {
            top: this.size.y >= 0 ? this.pos.y : this.pos.y + this.size.y,
            bottom: this.size.y >= 0 ? this.pos.y + this.size.y : this.pos.y,
            left: this.size.x >= 0 ? this.pos.x : this.pos.x + this.size.x,
            right: this.size.x >= 0 ? this.pos.x + this.size.x : this.pos.x
        };
    }
    overlap(rect) {
        const b1 = this.bounds;
        const b2 = rect.bounds;
        return b1.left < b2.right && b1.right > b2.left && b1.top < b2.bottom && b1.bottom > b2.top;
    }
    inside(p) {
        const b = this.bounds;
        return p.x >= b.left && p.x <= b.right && p.y >= b.top && p.y <= b.bottom;
    }
    comparisonData(rect) {
        const b1 = this.bounds;
        const b2 = rect.bounds;
        const closestXDist = Math.min(Math.abs(b1.left - b2.left), Math.abs(b1.left - b2.right), Math.abs(b1.right - b2.left), Math.abs(b1.right - b2.right));
        const closestYDist = Math.min(Math.abs(b1.top - b2.top), Math.abs(b1.top - b2.bottom), Math.abs(b1.bottom - b2.top), Math.abs(b1.bottom - b2.bottom));
        return {
            overlapping: this.overlap(rect),
            closestXDist,
            closestYDist
        };
    }
    get screen() {
        return new Rect2(currentCamera.toScreen(this.pos), this.size.scale(currentCamera.zoom));
    }
    get world() {
        return new Rect2(currentCamera.toWorld(this.pos), this.size.scale(1 / currentCamera.zoom));
    }
}
