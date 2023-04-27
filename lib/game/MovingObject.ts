import { Vector2 } from "../math/Vector2.js";
import { Collider, MaximumDistanceInfo } from "./Collider.js";
import { GameObject } from "./GameObject.js";
import { Object2D } from "./Object2D.js";

export class MovingObject extends Object2D {
    /** The change in postion when the `MovingObject` moves. */
    velocity: Vector2 = new Vector2();

    /** Whether or not the velocity is applied every update. */
    moveEveryFrame: boolean;

    constructor(name: string, moveEveryFrame: boolean, pos?: Vector2, children?: GameObject[]) {
        super(name, pos, children);
        this.moveEveryFrame = moveEveryFrame;
    }

    /** Moves the `MovingObject` by its `velocity` scaled by `delta` */
    move(delta: number): void {
        const { x: dx, y: dy }: Vector2 = this.velocity.scale(delta);
        const max: MaximumDistanceInfo | undefined = this.collider?.maxDistInfo;
        if (max == undefined) return this.pos.addAssign({ x: dx, y: dy }), undefined;

        this.pos.addAssign({
            x: Math.max(Math.min(dx, max.posx), -max.negx),
            y: Math.max(Math.min(dy, max.posy), -max.negy)
        });
    }

    /** The first `Collider` that is a direct child of this node. */
    get collider(): Collider | null {
        return this.children.find((v) => v instanceof Collider) as Collider ?? null;
    }

    override objectUpdate(delta: number): void {
        super.objectUpdate(delta);
        if (this.moveEveryFrame) this.move(delta);
    }
}