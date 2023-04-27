import { Vector2 } from "../math/Vector2.js";
import { Collider } from "./Collider.js";
import { GameObject } from "./GameObject.js";
import { Object2D } from "./Object2D.js";
export declare class MovingObject extends Object2D {
    /** The change in postion when the `MovingObject` moves. */
    velocity: Vector2;
    /** Whether or not the velocity is applied every update. */
    moveEveryFrame: boolean;
    constructor(name: string, moveEveryFrame: boolean, pos?: Vector2, children?: GameObject[]);
    /** Moves the `MovingObject` by its `velocity` scaled by `delta` */
    move(delta: number): void;
    /** The first `Collider` that is a direct child of this node. */
    get collider(): Collider | null;
    objectUpdate(delta: number): void;
}
