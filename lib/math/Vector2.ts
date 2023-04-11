export interface Point {
    x: number;
    y: number;
}

export interface PolarCoordinate {
    dist: number;
    rad: number;
}

export class Vector2 implements Point {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get copy(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    get distSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    get dist(): number {
        return Math.sqrt(this.distSquared);
    }

    get rad(): number {
        return Math.atan2(this.y, this.x);
    }

    get deg(): number {
        return this.rad * 180 / Math.PI;
    }

    get polar(): PolarCoordinate {
        return {
            dist: this.dist,
            rad: this.rad
        };
    }

    static fromPolar({dist, rad}: PolarCoordinate): Vector2 {
        return new Vector2(dist * Math.cos(rad), dist * Math.sin(rad));
    }

    set(v: Point): Vector2 {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    add(v: Point): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    addAssign(v: Point): Vector2 {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v: Point): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    subAssign(v: Point): Vector2 {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    scale(f: number): Vector2 {
        return new Vector2(this.x * f, this.y * f);
    }

    scaleAssign(f: number): Vector2 {
        this.x *= f;
        this.y *= f;
        return this;
    }

    rotate(rad: number): Vector2 {
        const p: PolarCoordinate = this.polar;
        p.rad += rad;
        return Vector2.fromPolar(p);
    }

    rotateAssign(rad: number): Vector2 {
        return this.set(this.rotate(rad));
    }

    rotateDeg(deg: number): Vector2 {
        return this.rotate(deg * Math.PI / 180);
    }

    rotateDegAssign(deg: number): Vector2 {
        return this.set(this.rotateDeg(deg));
    }

    rotateAround(p: Point, rad: number): Vector2 {
        return this.sub(p).rotate(rad).add(p);
    }

    get normalizationFactor(): number {
        return this.dist ? 1 / this.dist : 1;
    }

    get normalized(): Vector2 {
        return this.scale(this.normalizationFactor);
    }

    normalize(): Vector2 {
        return this.scaleAssign(this.normalizationFactor);
    }

    directionTo(v: Point): Vector2 {
        return this.neg.addAssign(v).normalize();
    }

    radTo(v: Point): number {
        return Math.atan2(this.y - v.y, this.x - v.x);
    }

    degTo(v: Point): number {
        return this.radTo(v) * 180 / Math.PI;
    }

    distSquaredTo(v: Point): number {
        const x: number = this.x - v.x;
        const y: number = this.y - v.y;
        return x * x + y * y;
    }

    distTo(v: Point): number {
        return Math.sqrt(this.distSquaredTo(v));
    }

    towards(dist: number, v: Point): Vector2 {
        return this.add(this.directionTo(v).scaleAssign(dist));
    }

    towardsAssign(dist: number, v: Point): Vector2 {
        return this.addAssign(this.directionTo(v).scaleAssign(dist));
    }

    static get random(): Vector2 {
        return new Vector2(Math.random(), Math.random());
    }

    get raw(): Point {
        return {
            x: this.x,
            y: this.y
        };
    }

    static fromRaw({x, y}: Point): Vector2 {
        return new Vector2(x, y);
    }

    get string(): string {
        return `(${this.x}, ${this.y})`;
    }

    toString(): string {
        return this.string;
    }

    dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    reset(): Vector2 {
        this.x = 0;
        this.y = 0;
        return this;
    }

    static get zero(): Vector2 {
        return new Vector2();
    }
    
    static get up(): Vector2 {
        return new Vector2(0, -1);
    }

    static get down(): Vector2 {
        return new Vector2(0, 1);
    }

    static get left(): Vector2 {
        return new Vector2(-1, 0);
    }

    static get right(): Vector2 {
        return new Vector2(1, 0);
    }

    get neg(): Vector2 {
        return this.scale(-1);
    }

    negAssign(): Vector2 {
        return this.scaleAssign(-1);
    }

    get abs(): Vector2 {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    absAssign(): Vector2 {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
}