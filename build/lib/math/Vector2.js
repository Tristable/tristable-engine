export class Vector2 {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get copy() {
        return new Vector2(this.x, this.y);
    }
    get distSquared() {
        return this.x * this.x + this.y * this.y;
    }
    get dist() {
        return Math.sqrt(this.distSquared);
    }
    get rad() {
        return Math.atan2(this.y, this.x);
    }
    get deg() {
        return this.rad * 180 / Math.PI;
    }
    get polar() {
        return {
            dist: this.dist,
            rad: this.rad
        };
    }
    static fromPolar({ dist, rad }) {
        return new Vector2(dist * Math.cos(rad), dist * Math.sin(rad));
    }
    set(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    addAssign(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    subAssign(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    scale(f) {
        return new Vector2(this.x * f, this.y * f);
    }
    scaleAssign(f) {
        this.x *= f;
        this.y *= f;
        return this;
    }
    rotate(rad) {
        const p = this.polar;
        p.rad += rad;
        return Vector2.fromPolar(p);
    }
    rotateAssign(rad) {
        return this.set(this.rotate(rad));
    }
    rotateDeg(deg) {
        return this.rotate(deg * Math.PI / 180);
    }
    rotateDegAssign(deg) {
        return this.set(this.rotateDeg(deg));
    }
    rotateAround(p, rad) {
        return this.sub(p).rotate(rad).add(p);
    }
    get normalizationFactor() {
        return this.dist ? 1 / this.dist : 1;
    }
    get normalized() {
        return this.scale(this.normalizationFactor);
    }
    normalize() {
        return this.scaleAssign(this.normalizationFactor);
    }
    directionTo(v) {
        return this.neg.addAssign(v).normalize();
    }
    radTo(v) {
        return Math.atan2(this.y - v.y, this.x - v.x);
    }
    degTo(v) {
        return this.radTo(v) * 180 / Math.PI;
    }
    distSquaredTo(v) {
        const x = this.x - v.x;
        const y = this.y - v.y;
        return x * x + y * y;
    }
    distTo(v) {
        return Math.sqrt(this.distSquaredTo(v));
    }
    towards(dist, v) {
        return this.add(this.directionTo(v).scaleAssign(dist));
    }
    towardsAssign(dist, v) {
        return this.addAssign(this.directionTo(v).scaleAssign(dist));
    }
    static get random() {
        return new Vector2(Math.random(), Math.random());
    }
    get raw() {
        return {
            x: this.x,
            y: this.y
        };
    }
    static fromRaw({ x, y }) {
        return new Vector2(x, y);
    }
    get string() {
        return `(${this.x}, ${this.y})`;
    }
    toString() {
        return this.string;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    reset() {
        this.x = 0;
        this.y = 0;
        return this;
    }
    static get zero() {
        return new Vector2();
    }
    static get up() {
        return new Vector2(0, -1);
    }
    static get down() {
        return new Vector2(0, 1);
    }
    static get left() {
        return new Vector2(-1, 0);
    }
    static get right() {
        return new Vector2(1, 0);
    }
    get neg() {
        return this.scale(-1);
    }
    negAssign() {
        return this.scaleAssign(-1);
    }
    get abs() {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }
    absAssign() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
}
