import { Vector2 } from "../math/Vector2.js";
import { GameObject } from "./GameObject.js";

/** A `GameObject` with a 2D position. */
export class Object2D extends GameObject {
    /** The 2D world position of the `Object2D`, relative to its parent. */
    pos: Vector2;

    constructor(name: string, pos: Vector2 = new Vector2()) {
        super(name);
        this.pos = pos;
    }

    /** The 2D world position of the `Object2D`, relative to the origin. */
    get globalPos(): Vector2 {
        if (this.parent instanceof Object2D) return this.pos.add(this.parent.globalPos);
        return this.pos;
    }

    set globalPos(pos: Vector2) {
        if (this.parent instanceof Object2D) this.pos.set(pos.subAssign(this.parent.globalPos));
        this.pos.set(pos);
    }
}