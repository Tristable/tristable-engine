import { Vector2, Point } from "./Vector2.js";
export interface Rectangle {
    pos: Point;
    size: Point;
}
export interface RectBounds {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export interface RectComparisonData {
    closestXDist: number;
    closestYDist: number;
    overlapping: boolean;
}
export declare class Rect2 implements Rectangle {
    pos: Vector2;
    size: Vector2;
    constructor(pos: Vector2, size: Vector2);
    static xywh(x: number, y: number, width: number, height: number): Rect2;
    get copy(): Rect2;
    set(r: Rect2): this;
    translate(v: Point): Rect2;
    translateAssign(v: Point): Rect2;
    scale(f: number): Rect2;
    scaleAssign(f: number): Rect2;
    expand(px: number): Rect2;
    expandAssign(px: number): Rect2;
    get area(): number;
    get perimeter(): number;
    get bounds(): RectBounds;
    overlap(rect: Rect2): boolean;
    inside(p: Point): boolean;
    comparisonData(rect: Rect2): RectComparisonData;
    get screen(): Rect2;
    get world(): Rect2;
}
