import { Vector2 } from "../math/Vector2.js";
import { Collider } from "./Collider.js";
import { Object2D } from "./Object2D.js";
export class MovingObject extends Object2D {
    /** The change in postion when the `MovingObject` moves. */
    velocity = new Vector2();
    /** Whether or not the velocity is applied every update. */
    moveEveryFrame;
    constructor(name, moveEveryFrame, pos, children) {
        super(name, pos, children);
        this.moveEveryFrame = moveEveryFrame;
    }
    /** Moves the `MovingObject` by its `velocity` scaled by `delta` */
    move(delta) {
        const { x: dx, y: dy } = this.velocity.scale(delta);
        const max = this.collider?.maxDistInfo;
        if (max == undefined)
            return this.pos.addAssign({ x: dx, y: dy }), undefined;
        this.pos.addAssign({
            x: Math.max(Math.min(dx, max.posx), -max.negx),
            y: Math.max(Math.min(dy, max.posy), -max.negy)
        });
    }
    /** The first `Collider` that is a direct child of this node. */
    get collider() {
        return this.children.find((v) => v instanceof Collider) ?? null;
    }
    objectUpdate(delta) {
        super.objectUpdate(delta);
        if (this.moveEveryFrame)
            this.move(delta);
    }
}
