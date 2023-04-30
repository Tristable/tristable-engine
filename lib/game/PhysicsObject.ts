import { Vector2 } from "../math/Vector2.js";
import { GameObject } from "./GameObject.js";
import { MovingObject } from "./MovingObject.js";

/** The environment for `PhysicsObject`s to use. */
export interface PhysicsEnvironment {
    /** The gravity to be applied to the y velocity of the `PhysicsObject`. */
    gravity: number;

    /** The friction to be applied to the x velocity of the `PhysicsObject`. */
    friction: number;
}

export class PhysicsObject extends MovingObject {
    /** The `PhysicsEnvironment` for this `PhysicsObject` to use. */
    env: PhysicsEnvironment;

    /** The amount that the `PhysicsObject`'s x velocity will increase each frame. */
    acceleration = 0;

    /** The maximum absolute x velocity of the `PhysicsObject`. */
    maximumVelocity: number;

    constructor(name: string, env: PhysicsEnvironment, maximumVelocity = Infinity, pos?: Vector2, children?: GameObject[]) {
        super(name, true, pos, children);
        this.env = env;
        this.maximumVelocity = maximumVelocity;
    }

    override objectUpdate(delta: number): void {
        super.objectUpdate(delta);

        if (!this.onWall) {
            this.velocity.x += this.acceleration * delta;
            if (this.velocity.x > 0) this.velocity.x -= Math.min(this.env.friction * delta, this.velocity.x);
            if (this.velocity.x < 0) this.velocity.x += Math.min(this.env.friction * delta, -this.velocity.x);
            if (Math.abs(this.velocity.x) > this.maximumVelocity) this.velocity.x = this.velocity.x < 0 ? -this.maximumVelocity : this.maximumVelocity;
        } else this.velocity.x = 0;
        
        this.velocity.y += this.env.gravity * delta;
        if ((this.onFloor && this.velocity.y > 0) || (this.onCeil && this.velocity.y < 0)) this.velocity.y = 0;
    }
}