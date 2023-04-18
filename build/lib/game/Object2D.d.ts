import { Vector2 } from "../math/Vector2.js";
import { GameObject } from "./GameObject.js";
/** A `GameObject` with a 2D position. */
export declare class Object2D extends GameObject {
    /** The 2D world position of the `Object2D`, relative to its parent. */
    pos: Vector2;
    constructor(name: string, pos?: Vector2, children?: GameObject[]);
    /** The 2D world position of the `Object2D`, relative to the origin. */
    get globalPos(): Vector2;
    set globalPos(pos: Vector2);
}
