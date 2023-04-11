export interface Point {
    x: number;
    y: number;
}
export interface PolarCoordinate {
    dist: number;
    rad: number;
}
export declare class Vector2 implements Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    get copy(): Vector2;
    get distSquared(): number;
    get dist(): number;
    get rad(): number;
    get deg(): number;
    get polar(): PolarCoordinate;
    static fromPolar({ dist, rad }: PolarCoordinate): Vector2;
    set(v: Point): Vector2;
    add(v: Point): Vector2;
    addAssign(v: Point): Vector2;
    sub(v: Point): Vector2;
    subAssign(v: Point): Vector2;
    scale(f: number): Vector2;
    scaleAssign(f: number): Vector2;
    rotate(rad: number): Vector2;
    rotateAssign(rad: number): Vector2;
    rotateDeg(deg: number): Vector2;
    rotateDegAssign(deg: number): Vector2;
    rotateAround(p: Point, rad: number): Vector2;
    get normalizationFactor(): number;
    get normalized(): Vector2;
    normalize(): Vector2;
    directionTo(v: Point): Vector2;
    radTo(v: Point): number;
    degTo(v: Point): number;
    distSquaredTo(v: Point): number;
    distTo(v: Point): number;
    towards(dist: number, v: Point): Vector2;
    towardsAssign(dist: number, v: Point): Vector2;
    static get random(): Vector2;
    get raw(): Point;
    static fromRaw({ x, y }: Point): Vector2;
    get string(): string;
    toString(): string;
    dot(v: Vector2): number;
    reset(): Vector2;
    static get zero(): Vector2;
    static get up(): Vector2;
    static get down(): Vector2;
    static get left(): Vector2;
    static get right(): Vector2;
    get neg(): Vector2;
    negAssign(): Vector2;
    get abs(): Vector2;
    absAssign(): Vector2;
}
