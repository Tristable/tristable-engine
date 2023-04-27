import { Rect2 } from "../math/Rect2.js";
import { Vector2 } from "../math/Vector2.js";
import { GameObject } from "./GameObject.js";
import { Object2D } from "./Object2D.js";
export interface MaximumDistanceInfo {
    negx: number;
    negy: number;
    posx: number;
    posy: number;
}
export declare class Collider extends Object2D {
    /** The AABB for the `Collider` to check collisions in. Position is the offset from the `globalPos` of the `SpriteObject`. */
    rect: Rect2;
    constructor(name: string, rect: Rect2, pos?: Vector2, children?: GameObject[]);
    /** The AABB for the `Collider` to check collisions in global space. */
    get globalRect(): Rect2;
    /** Every `Collider` in the scene tree. */
    get allColliders(): Collider[];
    get maxDistInfo(): MaximumDistanceInfo;
}
