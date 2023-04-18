import { Vector2 } from "../math/Vector2.js";
import { GameObject } from "./GameObject.js";
/** A `GameObject` with a 2D position. */
export class Object2D extends GameObject {
    /** The 2D world position of the `Object2D`, relative to its parent. */
    pos;
    constructor(name, pos = new Vector2(), children) {
        super(name, children);
        this.pos = pos;
    }
    /** The 2D world position of the `Object2D`, relative to the origin. */
    get globalPos() {
        if (this.parent instanceof Object2D)
            return this.pos.add(this.parent.globalPos);
        return this.pos;
    }
    set globalPos(pos) {
        if (this.parent instanceof Object2D)
            this.pos.set(pos.subAssign(this.parent.globalPos));
        this.pos.set(pos);
    }
}
